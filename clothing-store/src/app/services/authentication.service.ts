import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, catchError, map, throwError } from 'rxjs';
import { User } from 'src/models/user.model';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private registerUrl = 'api/users';
  private loginUrl = 'api/users';

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private sharedService: SharedService
  ) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.user = this.userSubject.asObservable();
  }

  // Register new user using json-server-auth
  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.registerUrl, user, this.httpOptions).pipe(
      tap((response: any) => {
        if (response) {
          console.log(`registered user id=${response.user.id}`);
        } else {
          console.log('Unexpected response occured: ', response);
        }
      }),
      catchError((error) => this.catchAuthError(error))
    );
  }


  loginUser(username: any, email: any, password: any): Observable<User> {
    const userUrl = `${this.loginUrl}?username=${username}&email=${email}&password=${password}`;
    return this.http
      .get<User>(userUrl, this.httpOptions)
      .pipe(
        map((response: any) => {
          if (response && response.length > 0) {
            console.log("RESPONSE fetching user:  ", response);
            let user = response[0];
  
            localStorage.setItem('currentUser', JSON.stringify(user));
  
            this.userSubject.next(user);
            console.log("LocalStorage value: ", localStorage);
  
            console.log(`user id=${user.id} logged in`);
            return user;
          } else {
            console.log('Unexpected response occurred: ', response);
            return null;
          }
        }),
        catchError((error) => this.catchAuthError(error))
      );
  }

  // loginUser(username: any, email: any, password: any): Observable<User> {
  //   const userUrl = `${this.loginUrl}?username=${username}&email=${email}&password=${password}`;
  //   return this.http
  //     .get<User>(userUrl, this.httpOptions)
  //     .pipe(
  //       map((response: any) => {
  //         if (response) {
  //           console.log("RESPONSE fetching user:  ", response);
  //           let user = response;

  //           localStorage.setItem('currentUser', JSON.stringify(user));

  //           this.userSubject.next(user);
  //           console.log("LocalStorage value: ", localStorage);

  //           console.log(`user w/ id=${user.id} logged in`);
  //           return user;
  //         } else {
  //           console.log('Unexptected response occured: ', response);
  //           return null;
  //         }

  //       }),
  //       catchError((error) => this.catchAuthError(error))
  //     );
  // }

  // loginUser(username: any, email: any, password: any): Observable<User> {
  //   return this.http
  //     .post<User>(
  //       this.loginUrl,
  //       { username: username, email: email, password: password },
  //       this.httpOptions
  //     )
  //     .pipe(
  //       map((response: any) => {
  //         if (response) {
  //           //let user = response.user;
  //           let user = response;

  //           localStorage.setItem('currentUser', JSON.stringify(user));

  //           this.userSubject.next(user);

  //           console.log(`user w/ id=${user.id} logged in`);


  //           return user;
  //         } else {
  //           console.log('Unexptected response occured: ', response);
  //           return null;
  //         }

  //       }),
  //       catchError((error) => this.catchAuthError(error))
  //     );
  // }

  updateUser(user: User): Observable<User> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const updatedUser: User = {
      ...currentUser,
      ...user
    };
    return this.http.put<User>(
      `${this.registerUrl}/${currentUser.id}`,
      updatedUser,
      this.httpOptions
    ).pipe(
      map((response: any) => {
        if (response) {
          const updatedUserData = response;
          localStorage.setItem('currentUser', JSON.stringify(updatedUserData));
          this.userSubject.next(updatedUserData);
          console.log(`User with id=${updatedUserData.id} successfully updated`);
          return updatedUserData;
        } else {
          console.error('Unexpected response:', response);
          return null;
        }
      }),
      catchError((error) => this.catchAuthError(error))
    );
  }


  userLogout() {
    localStorage.removeItem('currentUser');
    this.userSubject.next(null as any);
  }

  // /* custom getter that will make it easy for other components to quickly get the
  //    value of the currently logged-in user without subscribing to our observable. */
  // public get userValue(): User {
  //   return this.userSubject.value;
  // }

  catchAuthError(error: any): Observable<any> {
    let errorMessage = '';

    if (error && error.error) {
      errorMessage = error.error;
    } else if (error && error.message) {
      errorMessage = error.message;
    } else {
      errorMessage = JSON.stringify(error);
    }

    console.error(errorMessage);

    this.sharedService.alertMsg.emit({
      message: errorMessage,
      type: 'danger',
    });

    return throwError(error);
  }


}

