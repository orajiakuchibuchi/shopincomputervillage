import { BlockchainService } from './../../../services/blockchain.service';
import { User } from './../../models/User';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthUserResolver implements Resolve<boolean> {
  constructor(private blockchainService: BlockchainService){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any>{
    return User.serverState().then((user:User)=>{
      this.blockchainService._setuser(user)
      return user;
    })
  }
}
