import { Component, ViewChildren, QueryList, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';
import * as CodeMirror from 'codemirror';
import * as glob from '../menu/example';
import { Configuration } from '../config/config.model';
import { ConfigService } from '../config/config.service';
import { CodeMirrorDirective } from '../../shared/code-mirror/code-mirror.directive';
import { EditorType } from '../../shared/code-mirror/code-mirror.model';
import { environment } from 'src/environments/environment';

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

  processResponses(responses: any) {
    this.oValue += '\n';

    if (responses && responses.parameter) {
      for (const e of responses.parameter) {
        const name = e.name;
        let value = 'undefined';
        value = Object.keys(e).filter(k => k.startsWith('value'))[0];
        value = e[value] ?  JSON.stringify(e[value]) : (e.resource ? JSON.stringify(e.resource) : 'undefined');
        this.oValue += '>> ' + name + ': ' + value + '\n';
      }
    }

    this.updateOutput();
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
