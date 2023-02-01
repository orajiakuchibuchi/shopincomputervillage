import { map, tap } from 'rxjs/operators';

import { AuthService } from './../../../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private authService: AuthService,
              private Router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Observable<boolean | UrlTree> {
      return this.authService.status.pipe(
        tap((status:boolean)=>{
          if(!status){
            this.Router.navigateByUrl('auth/login').finally(()=>{
              setTimeout(() => {
                const sidebarNavToggler = document.getElementById("sidebarNavToggler");
                if(sidebarNavToggler && !sidebarNavToggler.classList.contains("active")){
                  sidebarNavToggler.click();
                }
              }, 500);
            });
          }
          return status
        })
      );
  }

}
