import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Producer } from 'src/models/producer.model';

@Injectable({
  providedIn: 'root'
})
export class ProducerService {

  private producersUrl = 'api/producers';

  constructor(private http: HttpClient) { }

  /** GET publishers from the server */
  getProducers(url: string): Observable<Producer[]> {
    return this.http.get<Producer[]>(url).pipe(
      tap((_) => console.log(`fetched producers from: ${url}`)),
      catchError(this.handleError<Producer[]>('getProducers', []))
    );
  }

  getAllProducers(): Observable<Producer[]> {
    return this.getProducers(this.producersUrl);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }



}
