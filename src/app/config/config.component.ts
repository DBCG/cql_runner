import { Component, EventEmitter, Output } from '@angular/core';
declare var $: any;

@Component ({
  selector: "runner-config",
  template: `
        <ngb-tabset>
            <ngb-tab title="Engine URL">
                <template ngbTabContent>
                    <div class="select-engine pull-left">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-lg-4">
                                    <span>URL to CQL Execution Service:</span>
                                    <input type="text" class="form-control" id="engineUrl" (change)="setEngineEvent()" placeholder="http://cql.dataphoria.org/cql/evaluate">
                                </div>
                            </div>                            
                        </div>                        
                    </div>
                </template>
            </ngb-tab>
            <ngb-tab title="Terminology URL">
                <template ngbTabContent>                    
                    <div class="select-terminology pull-left">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-lg-4">
                                    <span>URL to the terminology service:</span>
                                    <input type="text" class="form-control" id="termUrl" (change)="setTermEvent()" placeholder="http://fhirtest.uhn.ca/baseDstu3">
                                </div>
                                <div class="col-lg-4">
                                    <span>User Name:</span>
                                    <input type="text" class="form-control" id="termUser" (change)="setTermUserEvent()" placeholder="if applicable">
                                </div>
                                <div class="col-lg-4">
                                    <span>Password:</span>
                                    <input type="password" class="form-control" id="termPass" (change)="setTermPassEvent()" placeholder="if applicable">
                                </div>    
                            </div>                     
                        </div>                        
                    </div>
                </template>
            </ngb-tab>
            <ngb-tab title="Data URL">
                <template ngbTabContent>                    
                    <div class="select-data pull-left">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-lg-4">
                                    <span>URL to FHIR resource provider:</span>
                                    <input type="text" class="form-control" id="dataUrl" (change)="setDataEvent()" placeholder="http://fhirtest.uhn.ca/baseDstu3">
                                </div>
                                <div class="col-lg-4">
                                    <span>User Name:</span>
                                    <input type="text" class="form-control" id="dataUser" (change)="setDataUserEvent()" placeholder="if applicable">
                                </div>
                                <div class="col-lg-4">
                                    <span>Password:</span>
                                    <input type="password" class="form-control" id="dataPass" (change)="setDataPassEvent()" placeholder="if applicable">
                                </div>    
                            </div>                     
                        </div>                        
                    </div>
                </template>
            </ngb-tab>
            <ngb-tab title="Patient Info">
                <template ngbTabContent>
                    <div class="select-patient pull-left">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-lg-4">
                                    <span>Unique Patient ID:</span>
                                    <input type="text" class="form-control" id="patientId" (change)="setPatientEvent()" placeholder="Null">
                                </div>
                            </div>                            
                        </div>                        
                    </div>  
                </template>
            </ngb-tab>
        </ngb-tabset>
    `,
  styles: [`

        .select-terminology, .select-engine, .select-patient, .select-data {
            width: 100%;
        }

        .row {
            padding-top: 10px;
        }
    `]
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

  setEngineEvent() {
    var engineURL = $('#engineUrl').val();
    this.engine.emit(engineURL);
  }

  setTermEvent() {
    var termURL = $('#termUrl').val();
    this.term.emit(termURL);
  }

  setTermUserEvent() {
    var termUSER = $('#termUser').val();
    this.termUser.emit(termUSER);
  }

  setTermPassEvent() {
    var termPASS = $('#termPass').val();
    this.termPass.emit(termPASS);
  }

  setDataEvent() {
    var dataURL = $('#dataUrl').val();
    this.data.emit(dataURL);
  }

  setDataUserEvent() {
    var dataUSER = $('#dataUser').val();
    this.dataUser.emit(dataUSER);
  }

  setDataPassEvent() {
    var dataPASS = $('#dataPass').val();
    this.dataPass.emit(dataPASS);
  }

  setPatientEvent() {
    var patient = $('#patientId').val();
    this.patient.emit(patient);
  }
}
