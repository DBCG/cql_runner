import { Component, ViewChildren, QueryList, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';
import * as CodeMirror from 'codemirror';
import * as glob from '../menu/example';
import { Configuration } from '../config/config.model';
import { ConfigService } from '../config/config.service';
import { CodeMirrorDirective } from '../../shared/code-mirror/code-mirror.directive';
import { EditorType } from '../../shared/code-mirror/code-mirror.model';

@Component ({
  selector: 'app-runner',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './runner.component.html',
  styleUrls: ['./runner.component.css'],
  providers: [ ApiService ]
})

export class RunnerComponent {
  constructor(private apiService: ApiService, private configService: ConfigService) {
    this.config = configService.config;
  }


  EditorType = EditorType;
  @ViewChildren(CodeMirrorDirective) codeEditors: QueryList<CodeMirrorDirective>;
  error = '';
  running = false;

  oValue: string;
  private config: Configuration;

  output = 'Error formatting CQL code';
  getInputEditor() {
    return this.codeEditors.find((mirror) => mirror.type === EditorType.input);
  }

  run() {
    this.clear();
    if (!this.running) {
      this.running = true;
      const input = this.codeEditors.find((mirror) => mirror.type === EditorType.input);
      this.config.value = input.value;
      this.apiService.post(this.config)
        .forEach(responses => {
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
    for (const response of responses) {
      if (!response['translation-error'] && !response['error']) {
        response.line = parseInt(response.location.substring(response.location.indexOf('[') + 1, response.location.indexOf(':')));
      }
    }
    return responses;
  }

  processResponses(responses: any) {
    // TODO: Move this sorting/line property to service end
    responses = this.getNumberedResponses (responses);
    // Sort responses in ascending order by line number
    responses = responses.sort((a, b) => {
      return a.line === b.line ? 0 : +(a.line > b.line) || -1;
    });

    this.oValue += '\n';

    for (const response of responses) {
      // Invalid expression – could not translate
      if (response['translation-error']) {
        this.oValue += '>> Translation Error: ' + response['translation-error'] + '\n';
      }
      // Invalid expression – error with named expression
      if (response['error']) {
        this.oValue += '>> Error ' + response.location + ': ' + response['error'] + '\n';
      }
      // Valid expression
      if (response['result'] || response['result'] === '') {
        this.oValue += '>> ' + response['name'] + ' ' + response.location + ' ' + response.result + '\n';
      }
    }

    this.updateOutput();
  }
  format() {
    const currentEngineUrl = this.config.engineUri;
    const input = this.codeEditors.find((mirror) => mirror.type === EditorType.input);
    this.config.value = input.value;
    this.config.engineUri = 'http://cql.dataphoria.org/cql/format';
    this.apiService.post(this.config)
      .forEach(responses => {
        this.processResponse(responses);
      })
      .catch(error => {
        this.output = error;
        this.displayOutput();
      });
    this.config.engineUri = currentEngineUrl;
  }

  processResponse(responses: any) {
    for (const response of responses) {
      if (response['formatted-cql']) {
        this.output = response['formatted-cql'];
      }
    }

    this.displayOutput();
  }

  displayOutput() {
    const input = this.codeEditors.find((mirror) => mirror.type === EditorType.input);
    input.value = this.output;
  }

  setConfig(config: Configuration) {
    this.config = config;
  }

  clear() {
    this.oValue = '';
    const output = this.codeEditors.find((mirror) => mirror.type === EditorType.output);
    output.value = '';
  }

  private updateOutput() {
    const output = this.codeEditors.find((mirror) => mirror.type === EditorType.output);
    output.value = this.oValue;
  }

  getExample() {
    // const rand = Math.floor(Math.random() * glob.examples.length);
    return glob.examples[1].cql;
  }
}
