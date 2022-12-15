import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(this.addAuthToken(request));
  }

  addAuthToken(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicm9sZSI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJtb2JpbGVOdW1iZXIiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibGFzdE5hbWUiOiJpbml0IiwiZmlyc3ROYW1lIjoiaW5pdCIsInN0YXR1cyI6ImluaXQiLCJfaWQiOiJpbml0IiwiY3JlYXRlZEF0IjoiaW5pdCIsInVwZGF0ZWRBdCI6ImluaXQiLCJfX3YiOiJpbml0In0sInN0YXRlcyI6eyJyZXF1aXJlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJmaXJzdE5hbWUiOnRydWUsImxhc3ROYW1lIjp0cnVlLCJlbWFpbCI6dHJ1ZSwibW9iaWxlTnVtYmVyIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwicm9sZSI6dHJ1ZSwic3RhdHVzIjp0cnVlLCJjcmVhdGVkQXQiOnRydWUsInVwZGF0ZWRBdCI6dHJ1ZSwiX192Ijp0cnVlfX19LCJza2lwSWQiOnRydWV9LCIkaXNOZXciOmZhbHNlLCJfZG9jIjp7Il9pZCI6IjYzMzNkZDQyNTljZmUyMDYzYTI2ZTNmNyIsImZpcnN0TmFtZSI6IkFETUlOIiwibGFzdE5hbWUiOiJBRE1JTiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwibW9iaWxlTnVtYmVyIjo3MDQ5NzQ2NDM1LCJwYXNzd29yZCI6IiQyYiQxMCRNZ1ZqN0IwTENTcEFyYm41ZER1VTNldzdUQWRYd2NvY2JoYTRXcmhWN0ZDdHFKMk1NQ2VMSyIsInJvbGUiOiI2MzMyYzUzM2E5NmRkNWYwODI1MzEwYzEiLCJzdGF0dXMiOiJBQ1RJVkFURUQiLCJjcmVhdGVkQXQiOiIyMDIyLTA5LTI4VDA1OjM2OjAyLjE1OFoiLCJ1cGRhdGVkQXQiOiIyMDIyLTA5LTI4VDA1OjM2OjAyLjE1OFoiLCJfX3YiOjB9LCJpYXQiOjE2NzEwOTc4NjAsImV4cCI6MTY3MTE4NDI2MH0.OzLxUl6CujDreCvJ4OnmvolsoZ_IkK-FW86vMMabUHY`,
      },
    });
  }
}
