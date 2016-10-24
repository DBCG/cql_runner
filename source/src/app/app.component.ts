import { Component } from '@angular/core';
import { APIService, AceEditorDirective } from './shared/index';

import 'brace/theme/clouds';
import 'brace/mode/sql';
import 'cql-ace-syntax/cql';

@Component({
  directives: [AceEditorDirective],
  providers: [APIService],
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {

 constructor (private _apiService: APIService) {}

  error : string = '';
  running: boolean = false;
  // TODO: Set this to our default
  // TODO: Get these values from separate config file
  model = {
    fhirServiceUri: 'http://fhirtest.uhn.ca/baseDstu3',
    engineServiceUri: 'http://cql.dataphoria.org/cql/evaluate',
    dataServiceUri: 'http://fhirtest.uhn.ca/baseDstu3',
    patientId: 'null'
  };

  editingFhirUri: boolean = false;
  toggleEditingFhirUri() {
    this.editingFhirUri = !this.editingFhirUri;
  }

  editingEngineUri: boolean = false;
  toggleEditingEngineUri() {
    this.editingEngineUri = !this.editingEngineUri;
  }

  editingDataUri: boolean = false;
  toggleEditingDataUri() {
    this.editingDataUri = !this.editingDataUri;
  }

  editingPatientId: boolean = false;
  toggleEditingPatientId() {
    this.editingPatientId = !this.editingPatientId;
  }

  // Input editor settings
  iText: string = `// Enter your CQL script here and press 'Run'
// The results will be displayed on the console to the right

`;
  // Carries the latest value from input events
  iTextTemp: string;
  iOptions: any = { vScrollBarAlwaysVisible: true };
  iTheme: string = "clouds";

  runScript() {
    if (!this.running) {
      this.running = true;
      this._apiService
        .post(this.iTextTemp, this.model.engineServiceUri, this.model.fhirServiceUri, this.model.dataServiceUri, this.model.patientId)
        .then(responses => {
          this.processResponses(responses);
          this.running = false;
        })
        .catch(error => {
          this.error = error;
          this.running = false;
          this.oText += '>> Engine Service call failed: ' + error + '\n';
        });
    }
  }

  // Tacks on line numbers from the given string location
  private getNumberedResponses(responses: any) {

    for (let response of responses) {
      if (!response['translation-error'] && !response['error']) {
        response.line = parseInt(response.location.substring(response.location.indexOf("[")+1, response.location.indexOf(":")));
      }

    }

    return responses;

  }

  // Walks through responses and tacks each one onto the output window
  private processResponses (responses: any) {

    // TODO: Move this sorting/line property to service end
    responses = this.getNumberedResponses (responses);
    // // Sort responses in ascending order by line number
    responses = responses.sort(function(a, b){
      return a.line == b.line ? 0 : +(a.line > b.line) || -1;
    });

    this.oText += '\n';

    for (let response of responses) {
      // Invalid expression – could not translate
      if (response['translation-error']) {
        this.oText += '>> Translation Error: ' + response['translation-error'] + '\n';
      }
      // Invalid expression – error with named expression
      if (response['error']) {
        this.oText += '>> Error: ' + response['error'] + '\n';
      }
      // Valid expression
      if (response['result']) {
        this.oText += '>> ' + response.location + ' ' + response.result + '\n';
      }

    }
  }

  // Stores last known value of text input window
  onInputChange(code) {
    this.iTextTemp = code;
  }

  // Output editor settings

  oText: string = `// CQL expression results
`;
  oOptions:any = { vScrollBarAlwaysVisible: true, showLineNumbers: false , showGutter: false };
  oIsReadOnly: boolean = true;

  clearOutput() {
    this.oText = '';
  }

  resources: boolean = false;

  toggleResources () {
    this.resources = !this.resources;
  }

}
