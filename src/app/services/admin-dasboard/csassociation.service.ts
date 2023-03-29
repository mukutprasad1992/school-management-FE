import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'http://3.110.117.110:3000';

@Injectable({
  providedIn: 'root',
})
export class CsAssociationService {
  constructor(private http: HttpClient) {}

  public getAllClasses(url: string): Observable<any> {
    return this.http.get(`${API_URL}/${url}`).pipe(map((res) => res));
  }

  public getAllStudents(url: string): Observable<any> {
    return this.http.get(`${API_URL}/${url}`).pipe(map((res) => res));
  }

  public getClassStudentAssociation(url: string): Observable<any> {
    return this.http.get(`${API_URL}/${url}`).pipe(map((res) => res));
  }

  public createClassStudent(url: string, requestBody: any): Observable<any> {
    return this.http
      .post(`${API_URL}/${url}`, requestBody)
      .pipe(map((res) => res));
  }

  public deleteCSAssociation(Id: string): Observable<any> {
    return this.http.delete(`${API_URL}/${Id}`).pipe(map((res) => res));
  }
}
