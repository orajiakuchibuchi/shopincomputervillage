import { BlockchainService } from './../../../services/blockchain.service';
import { CookieService } from './../../../services/cookie.service';
import { map, tap } from 'rxjs/operators';
import { User } from './../../models/User';
import { AuthService } from './../../../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private authService: AuthService,
              private Router: Router,
              private CookieService: CookieService,
              private blockchainService: BlockchainService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return User.serverState().then((u:User)=>{
        if(u.sessionToken){
          return true;
        }
        return this.Router.navigateByUrl('auth');
      });
  }

}
