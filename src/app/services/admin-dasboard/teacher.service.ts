import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'http://3.110.117.110:3000';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private http: HttpClient) {}

  public getAllTeachers(url: string): Observable<any> {
    return this.http.get(`${API_URL}/${url}`).pipe(map((res) => res));
  }

  public getAllStatusUpdate(url: string, reqBody: any): Observable<any> {
    return this.http.put(`${API_URL}/${url}`, reqBody).pipe(map((res) => res));
  }

  public deleteTeacher(Id: string): Observable<any> {
    return this.http.delete(`${API_URL}/${Id}`).pipe(map((res) => res));
  }
}
