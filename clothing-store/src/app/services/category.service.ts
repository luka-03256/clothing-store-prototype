import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Category } from 'src/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesURL = 'api/categories';

  constructor(private http: HttpClient) { }

  /**fetch categories from server (GET) */
  getCategories(url: string): Observable<Category[]> {
    return this.http.get<Category[]>(url).pipe(
      tap((_) => console.log(`fetched categories from: ${url}`)),
      catchError(this.errorHandler<Category[]>('getCategories'))
    );
  }

  getAllCategories(): Observable<Category[]> {
    return this.getCategories(this.categoriesURL);
  }

  /**
   * handle failed http operation
   * @param op - name of operation which failed
   * @param result - optional value; return as observable
   * @returns 
   */
  private errorHandler<T>(op = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }

}
