import { Component, EventEmitter, Output } from '@angular/core';
import { Configuration } from './config.model';
import { environment } from '../../../environments/environment';

@Component ({
  selector: 'cql-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})

export class ConfigComponent {
  @Output('engine') engine$ = new EventEmitter();

  config = new Configuration();

  setConfig() {
    this.engine$.emit(this.config);
  }

}
