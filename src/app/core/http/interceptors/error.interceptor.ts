import { CookieService } from 'src/app/services/cookie.service';
import { LoaderService } from 'src/app/services/loader.service';
import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';

// @Injectable()
@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private _auth: AuthService,
    private cookieService: CookieService,
    private loader: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.handler(next, request);
  }
  handler(next: HttpHandler, request: HttpRequest<unknown>) {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((httpError: any) => {
          console.log(httpError);
          if(httpError.status == 400){
            let errorMsg = httpError.error;
            return throwError(errorMsg);
          }
          let errorMsg = httpError.error.message;

          if(errorMsg == "Failed!!! You are unauthorized!" || errorMsg== "Unauthenticated! Session not found!"){
            setTimeout(() => {
              let token = this.cookieService.getCookie("authToken");
              if(!token){
                localStorage.removeItem("authToken");
                this.cookieService.removeCookie("authToken");
                CookieService.remove("authToken");
                CookieService.remove("authUser");
                this.cookieService.removeCookie("authUser")
                this._auth.access_token.next('');
                this._auth.status.next(false);
                this._auth.user.next({});
              }else{
                let checker = localStorage.getItem('checker');
                if(!checker){
                  localStorage.setItem('checker', 'true');
                  window.location.reload();
                }else{
                  localStorage.removeItem("authToken");
                  localStorage.removeItem("checker");
                  this.cookieService.removeCookie("authToken");
                  CookieService.remove("authToken");
                  CookieService.remove("authUser");
                  this.cookieService.removeCookie("authUser")
                  this._auth.access_token.next('');
                  this._auth.status.next(false);
                  this._auth.user.next({});
                }
              }
            }, 2000);
          }
          if(httpError.message = "Timeout has occurred"){
            let errorMsg = httpError.message;
            this.loader.hide();
            return throwError(errorMsg);
          }
          return throwError(httpError);

        })
      )
  }
}
