import { FormModalComponent } from './../../../shared/form-modal/form-modal.component';
import { CookieService } from './../../../services/cookie.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../../services/auth.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, timer, throwError } from 'rxjs';
import { map, timeout, catchError } from 'rxjs/operators';
import { handleError } from '../../models/ErrorFormat';

@Injectable({
  providedIn: 'root'
})
export class IpGuard implements CanActivate {
  constructor(private deviceDetectorService: DeviceDetectorService,
    private AuthService: AuthService, private http: HttpClient,
    private cookieService: CookieService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const lastRecordedIp = this.cookieService.getCookie('lastVisitedIp');
      var now = new Date();
      now.setMinutes(now.getMinutes() + 30); // timestamp
      let expires = new Date(now); // Date object
      if(!lastRecordedIp){
        this.AuthService.getIp().pipe(timeout(5000),
        catchError( (err:any)=>{
          return throwError(err);
        })
        ).subscribe(ip=>{
          this.cookieService.setCookie('lastVisitedIp', {ip: ip.ip, time: Date.now()}, expires);
        })
        return timer(5000).pipe(map((x:any) => {
          return true;
        }));
      }else{
        return true;
      }
  }

}
