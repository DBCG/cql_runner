import { Component, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Configuration } from './config.model';
import { ConfigService } from './config.service';
import { environment } from '../../../environments/environment';

@Component ({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})

export class ConfigComponent {

  config: Configuration;
  isParametersOpen = true;

  constructor(private configService: ConfigService) {
    this.config = configService.config;
  }

  // TODO: Move to environmental config
  engineUrlOptions = [
    'http://cql.dataphoria.org/cql/evaluate',
  ];

  // fhirUrlOptions = [
  //   'http://measure.eval.kanvix.com/cqf-ruler/baseDstu3',
  //   'http://test.fhir.org/r2',
  //   'http://test.fhir.org/r3',
  //   'http://test.fhir.org/r4',
  //   'http://sandbox.hspconsortium.org'
  // ];

  terminologyUrlOptions = [
    'http://cql-sandbox.alphora.com/cqf-ruler-r4/fhir',
    'http://test.fhir.org/r2',
    'http://test.fhir.org/r3',
    'http://test.fhir.org/r4',
    'http://sandbox.hspconsortium.org'
  ];

  dataSourceUrlOptions = [
    'http://cql-sandbox.alphora.com/cqf-ruler-r4/fhir',
    'http://test.fhir.org/r2',
    'http://test.fhir.org/r3',
    'http://test.fhir.org/r4',
    'http://sandbox.hspconsortium.org'
  ];

  libraryUrlOptions = [
    'http://cql-sandbox.alphora.com/cqf-ruler-r4/fhir',
    'http://test.fhir.org/r2',
    'http://test.fhir.org/r3',
    'http://test.fhir.org/r4',
    'http://sandbox.hspconsortium.org'
  ];

  // toggleParametersOpen() {
  //   this.isParametersOpen = !this.isParametersOpen;
  // }

}
