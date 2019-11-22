import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { Configuration } from '../../components/config/config.model';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/internal/operators';

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
    return this.http.post(config.engineUri || environment.engineUri, JSON.stringify(data), {headers});
  }

  private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
      } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`);
      }
      // return an observable with a user-facing error message
      return throwError(
          'Something bad happened; please try again later.');
  }
}
