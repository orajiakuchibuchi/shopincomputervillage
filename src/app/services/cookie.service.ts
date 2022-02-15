import { CookieService as CS } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor(private cookieService: CS) { }

  setCookie(name: string, value: Object | string,
            expires?: number | Date | undefined,
            path?: string | undefined,
            domain?: string | undefined,
            secure?: boolean | undefined,
            sameSite?: "Lax" | "None" | "Strict" | undefined){
    if(typeof value === 'string'){
      this.cookieService.set(name, value, expires, path,domain,secure,sameSite);
    }else{
    this.cookieService.set(name, JSON.stringify(value), expires, path,domain,secure,sameSite);
    }
  }
  getCookie(name: string){
    return this.cookieService.get(name);
  }

  removeCookie(name: string){
    return this.cookieService.delete(name);
  }

  static set(cname:any, cvalue:any, exdays:any) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  static remove(cname:any) {
    const d = new Date();
    const exdays = new Date("Thu, 01 Jan 1970 00:00:00 UTC"); // set to expired
    d.setTime(d.getTime() + (exdays.getTime() * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=;" + ";" + expires + ";path=/";
  }
  static get(cname:any) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}
