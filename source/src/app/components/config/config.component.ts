import { Component, EventEmitter, Output } from '@angular/core';
declare var $: any;

@Component ({
  selector: 'runner-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})

export class ConfigComponent {
  @Output('engine') engine = new EventEmitter();
  @Output('term') term = new EventEmitter();
  @Output('termUser') termUser = new EventEmitter();
  @Output('termPass') termPass = new EventEmitter();
  @Output('data') data = new EventEmitter();
  @Output('dataUser') dataUser = new EventEmitter();
  @Output('dataPass') dataPass = new EventEmitter();
  @Output('patient') patient = new EventEmitter();

  engineURL = 'http://cql.dataphoria.org/cql/evaluate';
  termURL = 'http://measure.eval.kanvix.com/cqf-ruler/baseDstu3';
  termUSER = 'If applicable';
  termPASS = 'If applicable';
  dataURL = 'http://measure.eval.kanvix.com/cqf-ruler/baseDstu3';
  dataUSER = 'If applicable';
  dataPASS = 'If applicable';
  patientId = 'Null';

  setEngineEvent() {
    this.engineURL = $('#engineUrl').val();
    this.engine.emit(this.engineURL);
  }

  setTermEvent() {
    this.termURL = $('#termUrl').val();
    this.term.emit(this.termURL);
  }

  setTermUserEvent() {
    this.termUSER = $('#termUser').val();
    this.termUser.emit(this.termUSER);
  }

  setTermPassEvent() {
    this.termPASS = $('#termPass').val();
    this.termPass.emit(this.termPASS);
  }

  setDataEvent() {
    this.dataURL = $('#dataUrl').val();
    this.data.emit(this.dataURL);
  }

  setDataUserEvent() {
    this.dataUSER = $('#dataUser').val();
    this.dataUser.emit(this.dataUSER);
  }

  setDataPassEvent() {
    this.dataPASS = $('#dataPass').val();
    this.dataPass.emit(this.dataPASS);
  }

  setPatientEvent() {
    this.patientId = $('#patientId').val();
    this.patient.emit(this.patientId);

  }
}
