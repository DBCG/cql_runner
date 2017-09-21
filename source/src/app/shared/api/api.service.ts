import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Configuration } from '../../components/config/config.model'; 

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  // Send code statement
  post(
    config: Configuration): Promise<string>
  {
    let headers = new Headers({
      'Content-Type': 'application/json'
      //'Access-Control-Allow-Origin': 'http://localhost:8080/cqf-ruler/format'
    });

    let data = {
      "code": config.value,
      "fhirServiceUri": config.fhirUri,
      "fhirUser": config.fhirUsername,
      "fhirPass": config.fhirPassword,
      "dataServiceUri": config.dataSourceUri,
      "dataUser": config.dataSourceUsername,
      "dataPass": config.dataSourcePassword,
      "patientId": config.patientId
    };

    // TODO: enable authorization for engine service
    return this.http
      .post(config.engineUri, JSON.stringify(data), {headers: headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
