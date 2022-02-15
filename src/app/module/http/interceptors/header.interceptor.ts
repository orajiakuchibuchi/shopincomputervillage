import { CookieService } from './../../../services/cookie.service';
import { User } from './../../models/user.model';
import { AuthService } from './../../../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private CookieService: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes(AuthService.baseUrl)){
      let cookieUser:any = this.CookieService.getCookie('auth.user');
      if(cookieUser){
        cookieUser = JSON.parse(cookieUser);
        let requestClone = request.clone({
          setHeaders: {
            Authorization: `Bearer ${cookieUser.token}`,
            Accept: 'application/json',
            ContentType: 'application/json'
          } });
        return next.handle(requestClone);
      }
    }
    return next.handle(request);
  }
}
