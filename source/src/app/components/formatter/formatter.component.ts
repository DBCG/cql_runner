import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';

declare let CodeMirror:any;
declare let $: any;

@Component({
  selector: 'cql-formatter',
  templateUrl: './formatter.component.html',
  styleUrls: ['./formatter.component.css'],
  providers: [ ApiService ]
})
export class FormatterComponent implements OnInit {

  output: string = 'Error formatting CQL code';

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
  }

  format() {
    this._apiService.post($('.CodeMirror')[0].CodeMirror.getValue(), 'http://cql.dataphoria.org/cql/format', null, null, null, null, null, null, null, null, null)
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
    $('.CodeMirror')[1].CodeMirror.setValue(this.output);
  }
}
