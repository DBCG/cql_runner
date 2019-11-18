import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from '../../components/config/config.model';
import { environment } from '../../../environments/environment';
// import {catchError} from "rxjs/internal/operators";

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  // Send code statement
  post(config: Configuration): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const data = {
      code: config.value,
      terminologyServiceUri: config.terminologyUri,
      terminologyUser: config.terminologyUsername,
      terminologyPass: config.terminologyPassword,
      dataServiceUri: config.dataSourceUri || environment.dataSourceUri,
      dataUser: config.dataSourceUsername,
      dataPass: config.dataSourcePassword,
      patientId: config.patientId
    };

    // TODO: enable authorization for engine service
    return this.http
      .post(config.engineUri || environment.engineUri, JSON.stringify(data), {headers});
      // .pipe(
      //   catchError(this.handleError(''))
      // );
  }

  // private handleError(error: any) {
  //   console.error('An error occurred', error);
  //   return new Observable().pipe(error.message || error).toString;
  // }
}
