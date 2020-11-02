import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface EmailAvailableResponse {
  available: boolean;
}

interface SignupCredentials {
  email: string;
  password: string;
}

interface SignupSigninResponse {
  id: string;
  email: string;
}

interface SignedinResponse {
  currentUser: {
    authenticated: boolean;
    email: string;
    id: string;
    iat: number;
  };
}

interface SigninCredentials {
  email: string;
  password: string;
}

export interface UserById {
  email: string;
}

const optionRequete = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://worth-it.dev:80',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signedin$ = new BehaviorSubject(null);
  authenticated = false;
  // rootUrl = 'https://worth-it.dev';
  rootUrl = environment.API_URL;
  user: SignupSigninResponse = {
    email: '',
    id: '',
  };
  email = '';

  constructor(private http: HttpClient) {}

  emailAvailable(email: string) {
    return this.http.post<EmailAvailableResponse>(
      `${this.rootUrl}/api/users/uniqueemail`,
      {
        email,
      }
      // optionRequete
    );
  }

  signup(credentials: SignupCredentials) {
    return this.http
      .post<SignupSigninResponse>(
        `${this.rootUrl}/api/users/signup`,
        credentials
      )
      .pipe(
        tap((response) => {
          this.signedin$.next(true);
          this.user = response;
        })
      );
  }

  checkAuth() {
    return this.http
      .get<SignedinResponse>(`${this.rootUrl}/api/users/currentuser`)
      .pipe(
        tap(({ currentUser }) => {
          if (currentUser === null) {
            this.authenticated = false;
          } else {
            this.authenticated = currentUser.authenticated;
            this.user.email = currentUser.email;
            this.user.id = currentUser.id;
          }
          this.signedin$.next(this.authenticated);
        })
      );
  }

  signout() {
    return this.http.post(`${this.rootUrl}/api/users/signout`, {}).pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    );
  }

  signin(credentials: SigninCredentials) {
    return this.http
      .post<SignupSigninResponse>(
        `${this.rootUrl}/api/users/signin`,
        credentials
      )
      .pipe(
        tap((response) => {
          this.signedin$.next(true);
          this.user = response;
        })
      );
  }

  getUserById(userId: string) {
    return this.http.get<UserById>(`${this.rootUrl}/api/users/${userId}`);
  }
}
