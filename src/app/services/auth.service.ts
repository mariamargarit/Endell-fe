import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../models/user.model';

const AUTH_API = 'http://localhost:8080/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient){}

  signup(user: User): Observable<any>{
      //console.log('In AuthService');
      return this.http.post(AUTH_API + 'signup', user)
                      .pipe(catchError(this.handleError));;
  }

  login(user : User) : Observable<any>{
    return this.http.post(AUTH_API + 'login', user);
  }

  logout() {
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean{
    return localStorage.getItem('user') !== null;
  }

  private handleError(httpError: HttpErrorResponse) {
    let message:string = '';

    if (httpError.error instanceof ProgressEvent) {
        console.log('in progrss event')
        message = "Network error";
    }
    // else if (httpError.error instanceof ErrorEvent) {
    //   // A client-side or network error occurred. Handle it accordingly.
    //   message = httpError.error.message;
    //   console.error('An error occurred:', httpError.error.message);
    // } 
    else {
        message = httpError.error.message;
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${httpError.status}, ` +
        `body was: ${httpError.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(message);
  }
}
