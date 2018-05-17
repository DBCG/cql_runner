import { Component, ViewChildren, QueryList, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';
import * as CodeMirror from 'codemirror';
import * as glob from '../menu/example';
import { Configuration } from '../config/config.model';
import { ConfigService } from '../config/config.service';
import { CodeMirrorDirective } from '../../shared/code-mirror/code-mirror.directive';
import { EditorType } from '../../shared/code-mirror/code-mirror.model';

@Component ({
  selector: 'cql-runner',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './runner.component.html',
  styleUrls: ['./runner.component.css'],
  providers: [ ApiService ]
})

export class RunnerComponent {


  EditorType = EditorType;
  @ViewChildren(CodeMirrorDirective) codeEditors: QueryList<CodeMirrorDirective>;
  error = '';
  running = false;

  oValue: string;
  private _config: Configuration;
  constructor (private _apiService: ApiService, private _configService: ConfigService) {
    this._config = _configService.config;
  }
  getInputEditor() {
    return this.codeEditors.find((mirror)=> { return mirror._type === EditorType.input });
  }

  run() {
    this.clear();
    if (!this.running) {
      this.running = true;
      let input = this.codeEditors.find((mirror)=> { return mirror._type === EditorType.input });
      this._config.value = input.value;
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
        this.oValue += '>> Error ' + response.location + ': ' + response['error'] + '\n';
      }
      // Valid expression
      if (response['result'] || response['result'] == "") {
        this.oValue += '>> ' + response['name'] + ' ' + response.location + ' ' + response.result + '\n';
      }
    }

    this.updateOutput();
  }

  output: string = 'Error formatting CQL code';
  format() {
    let currentEngineUrl = this._config.engineUri;
    let input = this.codeEditors.find((mirror)=> { return mirror._type === EditorType.input });
    this._config.value = input.value;
    this._config.engineUri = 'http://cql.dataphoria.org/cql/format';
    this._apiService.post(this._config)
      .then(responses => {
        this.processResponse(responses);
      })
      .catch(error => {
        this.output = error;
        this.displayOutput();
      });
    this._config.engineUri = currentEngineUrl;
  }

  processResponse(responses: any) {
    for (let response of responses) {
      if (response['formatted-cql']) {
        this.output = response['formatted-cql'];
      }
    }

    this.displayOutput();
  }

  displayOutput() {
    let input = this.codeEditors.find((mirror)=> { return mirror._type === EditorType.input });
    input.value = this.output;
  }

  setConfig(config: Configuration) {
    this._config = config;
  }

  clear() {
    this.oValue = '';
    let output = this.codeEditors.find((mirror)=> { return mirror.type === EditorType.output });
    output.value = '';
  }

  private updateOutput() {
    let output = this.codeEditors.find((mirror)=> { return mirror.type === EditorType.output });
    output.value = this.oValue;
  }

  getExample() {
    // const rand = Math.floor(Math.random() * glob.examples.length);
    return glob.examples[1].cql;
  }
}
