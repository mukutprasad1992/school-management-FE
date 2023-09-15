import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'http://52.90.114.182';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  constructor(private http: HttpClient) { }

  public getAllClasses(url: string): Observable<any> {
    return this.http.get(`${API_URL}/${url}`).pipe(map((res) => res));
  }

  public getClassAttendance(url: string): Observable<any> {
    return this.http.get(`${API_URL}/${url}`).pipe(map((res) => res));
  }

  public getClasesFetched(url: string): Observable<any> {
    return this.http.get(`${API_URL}/${url}`).pipe(map((res) => res));
  }

  public classStudent(url: string): Observable<any> {
    return this.http.get(`${API_URL}/${url}`).pipe(map((res) => res));
  }

  public getAttendance(url: string): Observable<any> {
    return this.http.get(`${API_URL}/${url}`).pipe(map((res) => res));
  }

  public getStudentsId(url: string): Observable<any> {
    return this.http.get(`${API_URL}/${url}`).pipe(map((res) => res));
  }

  public uploadStudentPic(url: string, requestBody: any): Observable<any> {
    return this.http
      .post(`${API_URL}/${url}`, requestBody)
      .pipe(map((res) => res));
  }

  public createAttendance(url: string, requestBody: any): Observable<any> {
    return this.http
      .post(`${API_URL}/${url}`, requestBody)
      .pipe(map((res) => res));
  }

  public getAttendanceData(url: string): Observable<any> {
    return this.http.get(`${API_URL}/${url}`).pipe(map((res) => res));
  }

  public deleteAttendance(Id: string): Observable<any> {
    return this.http.delete(`${API_URL}/${Id}`).pipe(map((res) => res));
  }

  public getAttendanceDateAndClass(url: string): Observable<any> {
    return this.http.get(`${API_URL}/${url}`,).pipe(map((res) => res));
  }

}
