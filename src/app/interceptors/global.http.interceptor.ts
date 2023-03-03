import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TaostrService } from '../services/common/taostr.service';

@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {
  constructor(private taostrService: TaostrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.error.status === false) {
          console.info(error.error.result);
          if (error.error.result && Array.isArray(error.error.result)) {
            this.taostrService.showError(
              'HTTP ERROR',
              error.error.result[0].msg
            );
          } else {
            this.taostrService.showError('HTTP ERROR', error.error.result);
          }
        } else {
          this.taostrService.showError(
            'HTTP ERROR',
            "Something went wrong in API's execution"
          );
        }
        return throwError(() => new Error(error.error.result));
      })
    );
  }
}
