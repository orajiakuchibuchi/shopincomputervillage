declare const Moralis: any;

import { FormModalComponent } from './../../shared/form-modal/form-modal.component';
import { IndexedDbService } from './../../services/indexed-db.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { throwError } from 'rxjs';
import { CookieService } from 'src/app/services/cookie.service';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

export interface ErrorFormat {
  type: string;
  priority: number;
  message: string;
  cache: boolean;
}
function handleMoralisError(err:any) {
  switch (err.code) {
    case Moralis.Error.INVALID_SESSION_TOKEN:
      Moralis.User.logOut();
      // If web browser, render a log in screen
      // If Express.js, redirect the user to the log in route
      break;

    // Other Moralis API errors that you want to explicitly handle
  }
}
export function handleError(error:any) {
  let newError: any;
  if (error.error instanceof ErrorEvent) {
      // client-side error
      newError = new Error('Client-Side', 7, error.error.message, false);
  }else if(error instanceof HttpErrorResponse){
    // FormModalComponent.prompt('Unknown IP Address', 'auth/login','error', 'Refresh page', 'Opps we were not able to detect your device IP address. Ensure to turn off any adBlocker and VPN.', 1000);
  }
   else {
      // server-side error
      newError = new Error('Server-Side', 5, error.error.message, false);
  }
  const sessionRecord = sessionStorage.getItem(IndexedDbService.CLIENT_ERROR);
  if(!sessionRecord){
    const errors = [];
    errors.push(newError);
    sessionStorage.setItem(IndexedDbService.CLIENT_ERROR, JSON.stringify(errors));
  }else{
    const errors:Array<Error> = JSON.parse(sessionRecord);
    errors.push(newError);
    sessionStorage.setItem(IndexedDbService.CLIENT_ERROR, JSON.stringify(errors));
  }
  console.log(newError);
  if(newError?.message.includes("Unauthenticated.")){
    let user:any = CookieService.get("auth.user");
    if(user){
      user = JSON.parse(user);
      user.token = '';
    }
    localStorage.removeItem('auth.token');
    CookieService.remove("auth.user");
    if(!window.location.href.includes('auth')){
      FormModalComponent.prompt('Session Expired', 'auth/log-out','error', 'Log out', newError.message, 200);
    }
  }
  return throwError(newError);
}

export class Error {
  public type: string;
  public priority: number;
  public message: string;
  public cache: boolean;

  constructor(type: string, priority: number=5, message: string, cache: boolean = false){
    this.type = type;
    this.priority = priority;
    this.message = message;
    this.cache = cache;
  }
}
