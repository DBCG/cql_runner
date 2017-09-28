import { Component, ViewChildren, QueryList } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';
import { Configuration } from '../config/config.model';
import { CodeMirrorDirective } from '../../shared/code-mirror/code-mirror.directive';
import { EditorType } from '../../shared/code-mirror/code-mirror.model';

declare let CodeMirror:any;

@Component({
  selector: 'cql-formatter',
  templateUrl: './formatter.component.html',
  styleUrls: ['./formatter.component.css'],
  providers: [ ApiService ]
})
export class FormatterComponent {

  EditorType = EditorType;
  @ViewChildren(CodeMirrorDirective) codeEditors: QueryList<CodeMirrorDirective>;

  output: string = 'Error formatting CQL code';

  constructor(private _apiService: ApiService) { }

  format() {
    let input = this.codeEditors.find((mirror)=> { return mirror._type === EditorType.input });
    let config = new Configuration();
    config.value = input.value;
    this._apiService.post(config)
      .then(responses => {
        this.processResponse(responses);
      })
      .catch(error => {
        this.output = error;
        this.displayOutput();
      });
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
}
