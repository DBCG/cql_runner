import { Component, ViewChildren, QueryList } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';
import { Configuration } from '../config/config.model';
import { CodeMirrorDirective } from '../../shared/code-mirror/code-mirror.directive';
import { EditorType } from '../../shared/code-mirror/code-mirror.model';

declare let CodeMirror: any;

@Component({
  selector: 'app-formatter',
  templateUrl: './formatter.component.html',
  styleUrls: ['./formatter.component.css'],
  providers: [ ApiService ]
})
export class FormatterComponent {

  EditorType = EditorType;
  @ViewChildren(CodeMirrorDirective) codeEditors: QueryList<CodeMirrorDirective>;

  output = 'Error formatting CQL code';

  constructor(private apiService: ApiService) { }

  format() {
    const input = this.codeEditors.find((mirror) => mirror.type === EditorType.input);
    const config = new Configuration();
    config.value = input.value;
    this.apiService.post(config)
      .forEach(responses => {
        this.processResponse(responses);
      })
      .catch(error => {
        this.output = error;
        this.displayOutput();
      });
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
}
