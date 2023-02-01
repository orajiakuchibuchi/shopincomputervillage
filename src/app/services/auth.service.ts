import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isSocialMediaLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  access_token: BehaviorSubject<string> = new BehaviorSubject<string>('');
  user:BehaviorSubject<any> = new BehaviorSubject<any>({});;
  baseUrl:string = environment.api;
  maxLoginAttempt: number = 10;
  constructor(private http: HttpClient,private googleAuthService: SocialAuthService, private cookieService: CookieService) {
    const authToken = this.cookieService.getCookie("authToken");
    const authUser = this.cookieService.getCookie("authUser");
    console.log(authToken)
    this.access_token.next(authToken);
    if(this.access_token.value.length > 10){
      this.status.next(true);
    }
    if(authUser){
      this.user.next(JSON.parse(authUser));
    }
  }
  signInWithGoogle() {
    return this.googleAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  login(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/login`, data);
  }
  changePassword(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/change-password`, data);
  }
  requestCode(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/forgot-password-onetime-login`, data);
  }
  verifyCode(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/verify-onetime-login`, data);
  }
  verifyForgotPasswordCode(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/verify-forgot-password`, data);
  }
  resetForgotPasswordCode(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/reset-password`, data);
  }
  logout(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/logout`, data);
  }
  register(data:string): Observable<any> {
    return this.http.post<any>(`${environment.getapi('user-manage')}/api/users/register`, data);
  }
  getUserDetails(id:any){
    return this.http.get<any>(`${environment.getapi('user-manage')}/api/users/${id}`);
  }


}
