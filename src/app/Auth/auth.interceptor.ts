import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isLoggedIn = this.authService.isLoggedIn();
    // const isToServe = request.url.startsWith("http://localhost:8000/api/auth");
    const token = this.authService.getToken();

    if(isLoggedIn) {
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${token}`},
      });
    }
    return next.handle(request);
  }
}
