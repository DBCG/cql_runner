package org.opencds.cqf.cql.runner;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Iterator;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.xml.bind.*;
import org.cqframework.cql.cql2elm.CqlTranslator;
import org.cqframework.cql.cql2elm.CqlTranslatorException;
import org.cqframework.cql.cql2elm.LibraryManager;
import org.cqframework.cql.cql2elm.FhirModelInfoProvider;
import org.cqframework.cql.cql2elm.ModelInfoLoader;
import org.cqframework.cql.elm.tracking.TrackBack;
import org.cqframework.cql.elm.execution.Library;
import org.opencds.cqf.cql.execution.Context;
import org.opencds.cqf.cql.execution.CqlLibraryReader;
import org.opencds.cqf.cql.data.fhir.FhirDataProvider;
import org.opencds.cqf.cql.data.fhir.FhirBundleCursor;
import org.opencds.cqf.cql.terminology.fhir.FhirTerminologyProvider;
import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.rest.server.exceptions.ResourceNotFoundException;
import org.json.simple.JSONObject;
import org.json.simple.JSONArray;

@Path("evaluate")
public class EngineResource {

  Library library = null;
  private File xmlFile = null;

  public void registerProviders(Context context) {
    context.registerTerminologyProvider(new FhirTerminologyProvider()
           .withEndpoint("http://fhirtest.uhn.ca/baseDstu3"));
    context.registerDataProvider("http://hl7.org/fhir", new FhirDataProvider()
           .withEndpoint("http://fhirtest.uhn.ca/baseDstu3"));
  }

  public void performRetrieve(Object result, JSONObject results) {
    FhirContext fhirContext = FhirContext.forDstu3(); // for JSON parsing
    Iterator<Object> it = ((FhirBundleCursor)result).iterator();
    List<Object> findings = new ArrayList<>();
    while (it.hasNext()) {
      // TODO: currently returning full JSON retrieve response -- ugly and unwieldy
      findings.add(fhirContext
                    .newJsonParser()
                    .setPrettyPrint(true)
                    .encodeResourceToString((org.hl7.fhir.instance.model.api.IBaseResource)it.next()));
    }
    results.put("result", result == null ? "Null" : findings.toString());
  }

  public String resolveType(Object result) {
    String type = result == null ? "Null" : result.getClass().getSimpleName();
    if (type.equals("BigDecimal")) { type = "Decimal"; }
    else if (type.equals("ArrayList")) { type = "List"; }
    else if (type.equals("FhirBundleCursor")) { type = "Retrieve"; }
    return type;
  }

  public JSONArray getResultsBuildResponse(Context context, Map<String, Integer> expressionNameAndLocMap) {
    JSONArray resultArr = new JSONArray();
    for (String key : expressionNameAndLocMap.keySet()) {
      JSONObject results = new JSONObject();
      try {
        results.put("name", key);
		    // making an assumption here that expression appears at first column of line....
        results.put("location", "[" + expressionNameAndLocMap.get(key) + ":1]");
        Object result = context.resolveExpressionRef(library, key).getExpression().evaluate(context);

        if (result instanceof FhirBundleCursor) { // retrieve
          performRetrieve(result, results);
        }
        else {
          results.put("result", result == null ? "Null" : result.toString());
        }
        results.put("resultType", resolveType(result));
      }
      catch (RuntimeException e) {
        results.put("error", e.getMessage());
      }
      resultArr.add(results);
    }
    return resultArr;
  }

  @POST
  @Consumes({MediaType.TEXT_PLAIN})
  @Produces({MediaType.TEXT_PLAIN})
  public String evaluateCql(String cql) throws JAXBException, IOException {
    Map<String, Integer> expressionNameAndLocMap = getNameAndLocMap(cql);
    JSONArray resultArr = new JSONArray();
    try {
      translate(cql);
    }
    catch (IllegalArgumentException e) {
      JSONObject results = new JSONObject();
      results.put("translation-error", e.getMessage());
      resultArr.add(results);
      return resultArr.toJSONString();
    }

    // get results and build response
    Context context = new Context(library);
    registerProviders(context);
    return getResultsBuildResponse(context, expressionNameAndLocMap).toJSONString();
  }

  public Map<String, Integer> getNameAndLocMap(String cql) {
    // remove comments
    cql = cql.replaceAll("(//).*", "");
    cql = replaceMultilineComments(cql);

    // get each line
    String[] linesOfCode = cql.split("\\r?\\n");

    // Map format: { "name of expression" : location/line# of expression }
    Map<String, Integer> lineContents = new HashMap<>();
    for (int i = 0; i < linesOfCode.length; ++i) {
      // get define statement, but NOT functions
      if (linesOfCode[i].indexOf("define") >= 0 && linesOfCode[i].indexOf("define function") == -1) {
        Matcher m = Pattern.compile("(?<=define\\s).*?(?=:)").matcher(linesOfCode[i]);
        while (m.find()) {
          // line number = i + 1
          lineContents.put(m.group().replaceAll("\"", "").trim(), i + 1);
        }
      }
    }
    return lineContents;
  }

  public String replaceMultilineComments(String cql) {
    int numLines = 0;
    int idx = 0;
    while (cql.indexOf("/*", idx) >= 0) {
      String commented = cql.substring(cql.indexOf("/*", idx), cql.indexOf("*/", idx) + 2);
      numLines += commented.split("\\r?\\n").length;
      String replace = "";
      for (int i = 0; i < numLines - 1; ++i) {
        replace += "\n";
      }
      cql = cql.replace(commented, replace);
      idx = cql.indexOf("*/", idx);
    }
    return cql;
  }

  public void translate(String cql) throws JAXBException, IOException {
    try {
      ArrayList<CqlTranslator.Options> options = new ArrayList<>();
      options.add(CqlTranslator.Options.EnableDateRangeOptimization);
      CqlTranslator translator = CqlTranslator.fromText(cql, new LibraryManager(), options.toArray(new CqlTranslator.Options[options.size()]));

      if (translator.getErrors().size() > 0) {
        System.err.println("Translation failed due to errors:");
        ArrayList<String> errors = new ArrayList<>();
        for (CqlTranslatorException error : translator.getErrors()) {
          TrackBack tb = error.getLocator();
          String lines = tb == null ? "[n/a]" : String.format("[%d:%d, %d:%d]",
                  tb.getStartLine(), tb.getStartChar(), tb.getEndLine(), tb.getEndChar());
          errors.add(lines + error.getMessage());
        }
        throw new IllegalArgumentException(errors.toString());
      }

      // output translated library for review
      xmlFile = new File("response.xml");
      xmlFile.createNewFile();
      PrintWriter pw = new PrintWriter(xmlFile, "UTF-8");
      pw.println(translator.toXml());
      pw.println();
      pw.close();
    }
    catch (IOException e) {
        e.printStackTrace();
    }

    library = CqlLibraryReader.read(xmlFile);
  }
}
