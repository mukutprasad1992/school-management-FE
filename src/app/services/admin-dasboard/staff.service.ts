import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'http://13.232.89.251:3000';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  constructor(private http: HttpClient) {}

  public getAllStaffs(url: string): Observable<any> {
    return this.http.get(`${API_URL}/${url}`).pipe(map((res) => res));
  }
}
