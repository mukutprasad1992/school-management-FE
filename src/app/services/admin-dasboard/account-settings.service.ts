import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'http://52.90.114.182';

@Injectable({
  providedIn: 'root',
})
export class AccountSettingService {
  constructor(private http: HttpClient) { }

  public getAllAccountSetting(url: string): Observable<any> {
    return this.http.get(`${API_URL}/${url}`).pipe(map((res) => res));
  }

  public getAllRoles(url: string): Observable<any> {
    return this.http.get(`${API_URL}/${url}`).pipe(map((res) => res));
  }

  public updateUser(url: string, requestBody: any): Observable<any> {
    return this.http
      .put(`${API_URL}/${url}`, requestBody)
      .pipe(map((res) => res));
  }

  public uploadProfilePic(url: string, requestBody: any): Observable<any> {
    return this.http
      .post(`${API_URL}/${url}`, requestBody)
      .pipe(map((res) => res));
  }
}
