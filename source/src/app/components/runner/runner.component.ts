import { Component, ViewChildren, QueryList } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';
import * as CodeMirror from 'codemirror';
import { Configuration } from '../config/config.model';
import { CodeMirrorDirective } from '../../shared/code-mirror/code-mirror.directive';
import { Type } from '../../shared/code-mirror/code-mirror.model';

@Component ({
  selector: 'cql-runner',
  templateUrl: './runner.component.html',
  styleUrls: ['./runner.component.css'],
  providers: [ ApiService ]
})

export class RunnerComponent {


  Type = Type;
  @ViewChildren(CodeMirrorDirective) codeMirrors: QueryList<CodeMirrorDirective>;
  error = '';
  running = false;
  private _config: Configuration;
  oValue: string;

  constructor (private _apiService: ApiService) {}

  run() {
    this.clear();
    if (!this.running) {
      this.running = true;
      let input = this.codeMirrors.find((mirror)=> { return mirror._type === Type.input });
      this._config = {
        value: input.value
      };
      this._apiService.post(this._config)
        .then(responses => {
          this.processResponses(responses);
          this.running = false;
        })
        .catch(error => {
          this.error = error;
          this.running = false;
          this.oValue += '>> Engine Service call failed: ' + error + '\n';
          this.updateOutput();
        });
    }
  }

  // Tacks on line numbers from the given string location
  private getNumberedResponses(responses: any) {
    for (let response of responses) {
      if (!response['translation-error'] && !response['error']) {
        response.line = parseInt(response.location.substring(response.location.indexOf('[')+1, response.location.indexOf(':')));
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

    this.oValue += '\n';

    for (let response of responses) {
      // Invalid expression – could not translate
      if (response['translation-error']) {
        this.oValue += '>> Translation Error: ' + response['translation-error'] + '\n';
      }
      // Invalid expression – error with named expression
      if (response['error']) {
        this.oValue += '>> Error: ' + response['error'] + '\n';
      }
      // Valid expression
      if (response['result']) {
        this.oValue += '>> ' + response['name'] + ' ' + response.location + ' ' + response.result + '\n';
      }
    }

    this.updateOutput();
  }

  setConfig(config: Configuration) {
    this._config = config;
  }

  clear() {
    this.oValue = '';
    let output = this.codeMirrors.find((mirror)=> { return mirror.type === Type.output });
    output.value = '';
  }

  private updateOutput() {
    let output = this.codeMirrors.find((mirror)=> { return mirror.type === Type.output });
    output.value = this.oValue;
  }
}

