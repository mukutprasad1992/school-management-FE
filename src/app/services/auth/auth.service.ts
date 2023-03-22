import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const API_URL = 'http://localhost:3000';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  public saveAuthData(token: string, user: any, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('expirationDate', expirationDate.toISOString());
  }

  public resetPasswod(url: string, requestBody: any): Observable<any> {
    return this.http
      .post(`${API_URL}/${url}`, requestBody)
      .pipe(map((res) => res));
  }

  isAuthenticated() {
    const getToken = localStorage.getItem('token');
    if (getToken) {
      return true;
    } else {
      return false;
    }
  }
}
