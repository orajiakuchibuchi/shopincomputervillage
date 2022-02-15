import { Ceaseerciphers } from './../classes/CeaserCipher';
import { environment } from './../../../environments/environment';
import { Role } from "./role.model";
import { CookieService } from 'src/app/services/cookie.service';

export class User {
  public id: number| undefined;
  public email: string| undefined;
  public username: string| undefined;
  public picture: string | undefined;
  public token: string | undefined | null;
  private enkKey: number | undefined;
  private password: string | undefined;
  private verifiedAt: any;
  private createdAt: any;
  constructor(id: number| undefined,
              email:  string | undefined,
              username:  string | undefined,
              password:  string | undefined,
              token:  string | undefined){
    this.id = id;
    this.email = email;
    this.username = username;
    this.password = password;
    this.token = localStorage.getItem('auth.token') || undefined;
    this.createdAt = new Date();
  }

  setKey(){
    this.enkKey =  Math.floor(Math.random() * (25 - 0 + 1) + 0);
  }
  setPassword(password: string){
    if(this.enkKey == undefined){
      this.setKey();
    }else{
      this.password = Ceaseerciphers.encrypt(password, this.enkKey);
    }
  }
  setToken(token: string){
    localStorage.setItem('auth.token', token);
  }
  static default(){
    return new User(undefined, undefined, undefined, undefined, undefined);
  }
  getPicturePath(){
    return `${environment.apiUrl}/${this.picture}`;
  }
  verifiedEmail(){
    this.verifiedAt = new Date();
  }

  kill(){
    this.email = '';
    this.username = '';
    this.password = '';
    this.verifiedAt = '';
    this.createdAt = '';
  }
}

