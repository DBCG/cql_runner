import { Component } from '@angular/core';
import { ApiService } from '../api.service';

declare let CodeMirror:any;
declare let $: any;

@Component ({
  selector: 'runner',
  template: `
        <div class="container-fluid noPadding">
            <div class="col-lg-6 noPadding">
                <input-nav (run)="runScript()"></input-nav>
                <div class="noPadding">
                    <textarea cql-editor [theme]="'eclipse'" id="editor">// Enter CQL scripts here and hit 'Run'\n</textarea>
                </div>
            </div>
            <div class="col-lg-6 noPadding">
                <output-nav (clearOutput)="clearOutput()"></output-nav> 
                <div class="noPadding">
                    <textarea cql-editor                         
                        [id]="'editor2'" 
                        [mode]="'textile'"
                        [lineNumbers]="false" 
                        [readOnly]="true" 
                        [ruler]="[{}]"
                        [styleActiveLine]="false"
                        id="editor2">// See results here</textarea>
                </div> 
            </div>
        </div>
        <div class="container-fluid">
            <runner-config 
                (engine)="setEngine($event)"
                (term)="setTerm($event)"
                (termUser)="setTermUser($event)"
                (termPass)="setTermPass($event)"
                (data)="setData($event)"
                (dataUser)="setDataUser($event)"
                (dataPass)="setDataPass($event)"
                (patient)="setPatient($event)">
            </runner-config>
        </div>       
    `,
  styles: [`
        :host {
            font-family: 'Seqoe UI', Halvetica, Tahoma, Geneva, Verdana, sans-serif;
            height: 100%;
        }        

        .noPadding {
            padding: 0px !important;
        } 

        .button.running {
            background-color: darkgrey;
        }

        .button.running:hover {
            cursor: default;
        }

        button:focus {outline:0;}       
    `],
  providers: [ ApiService ]
})

export class CqlRunnerComponent {

  input: any = CodeMirror(document.getElementById("editor"));

  constructor (private _apiService: ApiService) {}

  error: string = '';
  running: boolean = false;

  // TODO: Get these values from separate config file
  model = {
    fhirServiceUri: 'http://measure.eval.kanvix.com/cqf-ruler/baseDstu3',
    termUser: 'user ID',
    termPass: 'password',
    engineServiceUri: 'http://cql.dataphoria.org/cql/evaluate',
    engineUser: 'user ID',
    enginePass: 'password',
    dataServiceUri: 'http://measure.eval.kanvix.com/cqf-ruler/baseDstu3',
    dataUser: 'user ID',
    dataPass: 'password',
    patientId: 'null'
  };

  oText: string;

  runScript() {
    this.clearOutput();
    if (!this.running) {
      this.running = true;
      this.runClassChange();
      //noinspection TypeScriptUnresolvedFunction
      this._apiService.post(
        $('.CodeMirror')[0].CodeMirror.getValue(),
        this.model.engineServiceUri,
        this.model.engineUser,
        this.model.enginePass,
        this.model.fhirServiceUri,
        this.model.termUser,
        this.model.termPass,
        this.model.dataServiceUri,
        this.model.dataUser,
        this.model.dataPass,
        this.model.patientId
      )
        .then(responses => {
          this.processResponses(responses);
          this.running = false;
          this.runningClassChange();
        })
        .catch(error => {
          this.error = error;
          this.running = false;
          this.runningClassChange();
          this.oText += '>> Engine Service call failed: ' + error + '\n';
          this.displayOutput();
        });
    }
  }

  runClassChange () {
    $('.run div').text('Running..');
    $('.run i').addClass('hidden');
    $('.run').attr('class', 'running');
  }

  runningClassChange () {
    $('.running div').text('Run');
    $('.running i').removeClass('hidden');
    $('.running').attr('class', 'run');
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

  processResponses(responses: any) {
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
        this.oText += '>> ' + response['name'] + ' ' + response.location + ' ' + response.result + '\n';
      }
    }

    this.displayOutput();
  }

  setEngine(event) {
    this.model.engineServiceUri = event;
  }

  setTerm(event) {
    this.model.fhirServiceUri = event;
  }

  setTermUser(event) {
    this.model.termUser = event;
  }

  setTermPass(event) {
    this.model.termPass = event;
  }

  setData(event) {
    this.model.dataServiceUri = event;
  }

  setDataUser(event) {
    this.model.dataUser = event;
  }

  setDataPass(event) {
    this.model.dataPass = event;
  }

  setPatient(event) {
    this.model.patientId = event;
  }

  clearOutput() {
    this.oText = '';
    let output = $('.CodeMirror')[1].CodeMirror;
    output.setValue("");
  }

  displayOutput() {
    $('.CodeMirror')[1].CodeMirror.setValue(this.oText);
  }
}

