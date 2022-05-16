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
    'https://cloud.alphora.com/sandbox/r4/cqm/fhir/$cql',
  ];

  // fhirUrlOptions = [
  //   'http://measure.eval.kanvix.com/cqf-ruler/baseDstu3',
  //   'http://test.fhir.org/r2',
  //   'http://test.fhir.org/r3',
  //   'http://test.fhir.org/r4',
  //   'http://sandbox.hspconsortium.org'
  // ];

  terminologyUrlOptions = [
    'https://cloud.alphora.com/sandbox/r4/cqm/fhir',
    'http://test.fhir.org/r2',
    'http://test.fhir.org/r3',
    'http://test.fhir.org/r4',
    'http://sandbox.hspconsortium.org'
  ];

  dataSourceUrlOptions = [
    'https://cloud.alphora.com/sandbox/r4/cqm/fhir',
    'http://test.fhir.org/r2',
    'http://test.fhir.org/r3',
    'http://test.fhir.org/r4',
    'http://sandbox.hspconsortium.org'
  ];

  libraryUrlOptions = [
    'https://cloud.alphora.com/sandbox/r4/cqm/fhir',
    'http://test.fhir.org/r2',
    'http://test.fhir.org/r3',
    'http://test.fhir.org/r4',
    'http://sandbox.hspconsortium.org'
  ];

  // toggleParametersOpen() {
  //   this.isParametersOpen = !this.isParametersOpen;
  // }

}
