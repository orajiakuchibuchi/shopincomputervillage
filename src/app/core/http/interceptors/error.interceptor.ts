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
          if(httpError.message = "Timeout has occurred"){
            let errorMsg = httpError.message;
            this.loader.hide();
            return throwError(errorMsg);
          }
          let errorMsg = httpError.error.message;
          if(errorMsg == "Failed!!! You are unauthorized!"){
            localStorage.removeItem("authToken");
            this.cookieService.removeCookie("authToken")
            this.cookieService.removeCookie("authUser")
            this._auth.access_token.next('');
            this._auth.status.next(false);
            this._auth.user.next({});
          }
          return throwError(httpError);
        })
      )
  }
}
