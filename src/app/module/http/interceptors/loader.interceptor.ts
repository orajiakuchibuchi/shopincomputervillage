import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private spinnerService: NgxSpinnerService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerService.show();
    return this.handler(next, request);
  }
  handler(next: HttpHandler, request: HttpRequest<unknown>) {
    return next.handle(request).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse || evt instanceof HttpErrorResponse) {
          this.spinnerService.hide();
        }
         }));
  }
}
