import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  // Send code statement
  post(code: string, engineServiceUri: string, engineUser: string, enginePass: string, fhirServiceUri: string, fhirUser: string, fhirPass: string, dataServiceUri: string, dataUser: string, dataPass: string, patientId: string): Promise<string>
  {
    let headers = new Headers({
      'Content-Type': 'text/plain'
      //'Access-Control-Allow-Origin': 'http://localhost:8080/cqf-ruler/format'
    });

    var data = {
      "code": code,
      "fhirServiceUri": fhirServiceUri,
      "fhirUser": fhirUser,
      "fhirPass": fhirPass,
      "dataServiceUri": dataServiceUri,
      "dataUser": dataUser,
      "dataPass": dataPass,
      "patientId": patientId
    };

    // TODO: enable authorization for engine service
    return this.http
      .post(engineServiceUri, JSON.stringify(data), {headers: headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
