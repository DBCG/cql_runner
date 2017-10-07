import { Injectable } from '@angular/core';
import { Configuration } from './config.model';

@Injectable()
export class ConfigService {

    private _config = new Configuration();

    set config(c: Configuration) {
        this._config = c;
    } get config(): Configuration {
        return this._config;
    }
}