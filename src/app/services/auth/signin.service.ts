import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'http://3.110.117.110:3000';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  constructor(private http: HttpClient) {}

  public signIn(url: string, requestBody: any): Observable<any> {
    return this.http
      .post(`${API_URL}/${url}`, requestBody)
      .pipe(map((res) => res));
  }
}
