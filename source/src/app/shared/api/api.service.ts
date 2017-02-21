import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class APIService {

constructor(private http: Http) { }

  // Send code statement
  // engineService - URI of CQL engine
  // fhirService - URI of FHIR engine
  post(code: string, engineServiceUri: string, engineUser: string, enginePass: string, fhirServiceUri: string, fhirUser: string, fhirPass: string, dataServiceUri: string, dataUser: string, dataPass: string, patientId: string): Promise<string> 
  {
    let headers = new Headers({
      'Content-Type': 'text/plain',
      // TODO: Comment back in once we've added localhost to CORS on the service end'
      // Reference: http://stackoverflow.com/questions/18234366/restful-webservice-how-to-set-headers-in-java-to-accept-xmlhttprequest-allowed
      //'FHIR-Service' : fhirServiceUri
    });
    var data = {
      "code": code,
      "fhirServiceUri": fhirServiceUri,
      "fhirUser": fhirUser,
      "fhirPass": fhirPass,
      "dataServiceUri": dataServiceUri,
      "dataUser": dataUser,
      "dataPass": dataPass,
      "patientId": patientId
    };
    // TODO: enable authorization for engine service
    return this.http
               .post(engineServiceUri, JSON.stringify(data), {headers: headers})
               .toPromise()
               .then(res => res.json())
               .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
