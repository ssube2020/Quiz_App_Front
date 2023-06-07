import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
     let token = localStorage.getItem('token')
        const authReq = !!token
          ? request.clone({
              setHeaders: { Authorization: 'Bearer ' + token },
            })
          : request;
        return next.handle(authReq);
  }
}
