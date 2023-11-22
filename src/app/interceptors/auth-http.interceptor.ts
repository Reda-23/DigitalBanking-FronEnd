import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {LoginService} from "../services/login.service";

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  constructor(private login : LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes("/security/auth")) {
      let req = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + this.login.accessToken)

      });
      return next.handle(req).pipe(
        catchError(err => {
          if (err.status == 401) {
            this.login.logout();
          }
          return throwError(err.messageerror);
        })
      );
    }else {
    return next.handle(request);
  }}
}
