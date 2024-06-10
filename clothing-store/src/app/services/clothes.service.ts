import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Clothes } from 'src/models/clothes.model';

@Injectable({
  providedIn: 'root'
})
export class ClothesService {
  private clothesURL = 'api/clothes';
  private featuredClothesURL = 'api/clothes?featured=true';
  private popularClothesURL = 'api/clothes?featured=false&_sort=purchaseCount,viewsCount&_order=desc,desc&_limit=5';
  private recentClothesUrl = 'api/clothes?featured=false&_sort=id&_order=desc&_limit=5';
  private recommendedClothessUrl = 'api/clothes?featured=false&_limit=5';


  constructor(private http: HttpClient) { }


  /**fetch clothes from server (GET) */
  getClothes(url: string): Observable<Clothes[]> {
    return this.http.get<Clothes[]>(url).pipe(
      tap((_) => console.log(`fetched clothes from: ${url}`)),
      catchError(this.handleError<Clothes[]>('getClothes', []))
    );
  }

  getFeaturedClothes(): Observable<Clothes[]> {
    return this.getClothes(this.featuredClothesURL);
  }

  getPopularClothes(): Observable<Clothes[]> {
    return this.getClothes(this.popularClothesURL);
  }

  getRecentClothes(): Observable<Clothes[]> {
    return this.getClothes(this.recentClothesUrl);
  }

  getRecommendedClothes(excludeID: number = 0, category: string = 'Komplet'): Observable<Clothes[]> {
    return this.getClothes(`${this.recommendedClothessUrl}&id_ne=${excludeID}&category.name=${category}`)
  }

  getAllClothes(): Observable<Clothes[]> {
    return this.getClothes(this.clothesURL);
  }

  getSearchClothes(term: string): Observable<Clothes[]> {
    if (term) {
      return this.getClothes(`${this.clothesURL}?title_like=${term}`);
    } else {
      return this.getClothes(this.clothesURL);
    }
  }

    /** GET book by id. Return `undefined` when id not found */
    getClothingItemNo404<Data>(id: number): Observable<Clothes> {
      const url = `${this.clothesURL}/?id=${id}`;
      return this.http.get<Clothes[]>(url).pipe(
        map((clothes) => clothes[0]), // returns a {0|1} element array
        tap((h) => {
          const outcome = h ? `fetched` : `did not find`;
          console.log(`${outcome} clothes id=${id}`);
        }),
        catchError(this.handleError<Clothes>(`getClothes id=${id}`))
      );
    }

  /**GET one! book by its corresponding id */
  getClothingItem(id: number): Observable<Clothes> {
    const url = `${this.clothesURL}/${id}`;
    return this.http.get<Clothes>(url).pipe(
      tap((_) => console.log(`fetched clothing item id=${id}`)),
      catchError(this.handleError<Clothes>(`getClothingItem id=${id}`))
    )
  }

  /**GET clothes whose name corresponds to term being searched */
  searchClothes(term: string): Observable<Clothes[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Clothes[]>(`${this.clothesURL}?title_like=${term}&limit=10`)
      .pipe(
        tap((_) => console.log(`found clothing items matching given criteria="${term}"`)),
        catchError(this.handleError<Clothes[]>('searchClothes', []))
      )
  }

  /**
   * Handle Http operation which failed.
   * Continue with execution of app.
   * @param operation - name of operation which has failed
   * @param result - optional value return as Observable result
   * @returns 
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      // let the app keep running by returning an empty result.
      return of(result as T);
    }
  }
}
