import { Component, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Configuration } from './config.model';
import { ConfigService } from './config.service';
import { environment } from '../../../environments/environment';

@Component ({
  selector: 'cql-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})

export class ConfigComponent {

  config: Configuration;
  isParametersOpen = true;

  constructor(private _configService: ConfigService) {
    this.config = _configService.config;
  }

  // TODO: Move to environmental config
  engineUrlOptions = [
    'http://cql.dataphoria.org/cql/evaluate',
    'http://google.com/cql/engine'
  ];

  // fhirUrlOptions = [
  //   'http://measure.eval.kanvix.com/cqf-ruler/baseDstu3',
  //   'http://test.fhir.org/r2',
  //   'http://test.fhir.org/r3',
  //   'http://test.fhir.org/r4',
  //   'http://sandbox.hspconsortium.org'
  // ];

  terminologyUrlOptions = [
    'http://measure.eval.kanvix.com/cqf-ruler/baseDstu3',
    'http://test.fhir.org/r2',
    'http://test.fhir.org/r3',
    'http://test.fhir.org/r4',
    'http://sandbox.hspconsortium.org'
  ];

  dataSourceUrlOptions = [
    'http://measure.eval.kanvix.com/cqf-ruler/baseDstu3',
    'http://test.fhir.org/r2',
    'http://test.fhir.org/r3',
    'http://test.fhir.org/r4',
    'http://sandbox.hspconsortium.org'
  ];

  // toggleParametersOpen() {
  //   this.isParametersOpen = !this.isParametersOpen;
  // }

}
