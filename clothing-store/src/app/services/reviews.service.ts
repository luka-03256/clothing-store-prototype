import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Review } from 'src/models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private reviewsURL = 'api/reviews';

  constructor(private http: HttpClient) { }

  getReviews(url: string): Observable<Review[]> {
    return this.http.get<Review[]>(url).pipe(
      tap((_) => console.log(`fetched reviews from: ${url}`)),
      catchError(this.errorHandler<Review[]>('getReviews',[]))
    );
  }


  getClothingItemReviews(clothesId: number): Observable<Review[]>{
    return this.http.get<Review[]>(`${this.reviewsURL}?clothesId=${clothesId}&_limit=5`);
  }


  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.reviewsURL}`);
  }

  private errorHandler<T>(op='operation', result?: T) {
    return (err: any): Observable<T> => {
      console.error(err);
      return of(result as T);
    };
  }


}
