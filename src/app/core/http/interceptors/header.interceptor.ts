
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'src/app/services/cookie.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
    private CookieService: CookieService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes(environment.baseapi)) {
      if (this.authService.access_token.value.length > 5) {
        let requestClone = request.clone({
          setHeaders: {
            'Client-Id': environment.clientID,
            'Authorization': `Bearer ${this.authService.access_token.value}`,
            'Accept': 'application/json',
            'ContentType': 'application/json'
          }
        });
        return next.handle(requestClone);

      } else {
        let requestClone = request.clone({
          setHeaders: {
            'Client-Id': environment.clientID,
            'Accept': 'application/json',
            'ContentType': 'application/json'
          }
        });
        return next.handle(requestClone);

      }

    }

    return next.handle(request);
  }
}
