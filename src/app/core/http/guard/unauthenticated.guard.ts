import { CookieService } from './../../../services/cookie.service';
import { AuthService } from './../../../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnauthenticatedGuard implements CanActivate {
  constructor(private authService: AuthService,
              private Router: Router,
              private CookieService: CookieService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let _state = this.authService.status.value;
      if(!_state){
        return true;
      }
      return this.Router.navigateByUrl('marketplace');
    }

}
