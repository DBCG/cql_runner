import { Injectable } from '@angular/core';
import { Configuration } from './config.model';

@Injectable()
export class ConfigService {

  config = new Configuration();

  set configuration(c: Configuration) {
    this.config = c;
  } get configuration(): Configuration {
    return this.config;
  }
}
