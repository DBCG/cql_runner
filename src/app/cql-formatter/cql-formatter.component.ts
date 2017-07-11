import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

declare let CodeMirror:any;
declare let $: any;

@Component({
  selector: 'app-cql-formatter',
  templateUrl: './cql-formatter.component.html',
  styleUrls: ['./cql-formatter.component.css'],
  providers: [ ApiService ]
})
export class CqlFormatterComponent implements OnInit {

  output: string = 'Error formatting CQL code';

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
  }

  format() {
    this._apiService.post($('.CodeMirror')[0].CodeMirror.getValue(), 'http://measure.eval.kanvix.com/cqf-ruler/format', null, null, null, null, null, null, null, null, null)
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
