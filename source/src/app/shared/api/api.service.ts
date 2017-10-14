import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Configuration } from '../../components/config/config.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  // Send code statement
  post(
    config: Configuration): Promise<string>
  {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const data = {
      "code": config.value,
      "terminologyServiceUri": config.terminologyUri,
      "terminologyUser": config.terminologyUsername,
      "terminologyPass": config.terminologyPassword,
      "dataServiceUri": config.dataSourceUri || environment.dataSourceUri,
      "dataUser": config.dataSourceUsername,
      "dataPass": config.dataSourcePassword,
      "patientId": config.patientId
    };

    // TODO: enable authorization for engine service
    return this.http
      .post(config.engineUri || environment.engineUri, JSON.stringify(data), {headers: headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
