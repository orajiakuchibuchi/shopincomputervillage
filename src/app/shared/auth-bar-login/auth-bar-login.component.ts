import { catchError } from 'rxjs/operators';
import { NetworkService } from 'src/app/services/network.service';
import { LoaderService } from 'src/app/services/loader.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { validateEmail } from 'src/app/core/utils/particles';
import { NotificationService } from 'src/app/services/notification.service';
import { throwError } from 'rxjs';
import { CookieService } from 'src/app/services/cookie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-bar-login',
  templateUrl: './auth-bar-login.component.html',
  styleUrls: ['./auth-bar-login.component.css']
})
export class AuthBarLoginComponent implements OnInit {
  existingUser: any = {
    email: '',
    password: '',
  }
  formStatus: boolean = false;
  errorMessage: string = '';
  passwordType: string = 'password';
  trial: any = 1;
  constructor(private _notification: NotificationService,
    private network: NetworkService,
    private cookieService: CookieService,
    private router: Router,
    private _auth: AuthService, private loaderService: LoaderService) { }

  ngOnInit(): void {
    let trial:any = localStorage.getItem("loginAttenptTiral");
    if(trial){
      try {
        trial = parseInt(trial);
        this.trial = trial;
        if(this.trial == this._auth.maxLoginAttempt){
          this.errorMessage = 'You have exceeded the maximum amount of trial. Please checkback later or contact the support team.';
          localStorage.removeItem("loginAttenptTiral");
        }
      } catch (error) {
        localStorage.removeItem("loginAttenptTiral");
      }
    }
  }
  attemptLoginClick(){
    const fieldsID = this.clearErrorForm();
    this.formStatus = false;
    let message = ``;
    if(this.existingUser.email.length < 1){
      fieldsID.email.classList.add("formError");
      this.formStatus = true;
      message += `Email is missing. `;
    }
    if(this.existingUser.password.length < 6){
      fieldsID.password.classList.add("formError");
      this.formStatus = true;
      message += `Password must be up to 6 characters. `;
    }
    if(this.formStatus){
      this._notification.openInfo('Reconfirm Form', message);
    }
    this.existingUser.email = this.existingUser.email;
    if(!validateEmail(this.existingUser.email)){
      message += 'Invalid email. Please ensure to input a valid email address';
    }

    // Valid email
    this.loaderService.show();
    let networkstatus = this.network.getStatus();
    if(networkstatus !== 'ONLINE'){
      this.errorMessage = 'Opps, your network is disconnected, please reconnect and try again';
      this.loaderService.hide();
      return;
    }
    this._auth.login(this.existingUser)
    .pipe(
      catchError((err:any)=>{
        console.log(err);
        this.loaderService.hide();
        this.errorMessage = err.message;
        return throwError(err);
      })
    )
    .subscribe(
      (response:any)=>{
        this.loaderService.hide();
        console.log(response);
        if(response.status == 400){
          this.trial++;
          this.errorMessage = `${response.message}. ${this.trial}/${this._auth.maxLoginAttempt}`
          localStorage.setItem("loginAttenptTiral", this.trial);
        }else if(response.status == 200){
          localStorage.setItem("authToken",response.data.access_token );
          this.cookieService.setCookie("authUser", response.data);
          this.cookieService.setCookie("authToken", response.data.access_token);
          this._auth.access_token.next(
            response.data.access_token
          );
          this._auth.user.next(response.data);
          this._auth.status.next(
            true
          );
          this.router.navigate(['marketplace'])


          // {
          //   "status": 200,
          //   "data": {
          //       "id": 2,
          //       "email": "mgbemelekelvin@gmail.com",
          //       "email_verified_at": "2022-09-30T11:41:46.000000Z",
          //       "country_prefix": "234",
          //       "phone_number": "9060698110",
          //       "phone_number_verified_at": "2022-09-30 11:43:14",
          //       "kyc_confirmation": "approved",
          //       "active": "1",
          //       "deleted_at": null,
          //       "created_at": "2022-09-15T16:34:37.000000Z",
          //       "updated_at": "2022-09-16T11:10:09.000000Z",
          //       "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZGZiMmVmN2Q4OWMwMWUwODlhNjMwMTlhNTc3OTkwNTJhOWVmY2E5YjA5NzcxNjdlNjcyODA4ODhkOTAwMTdmMzI3ODY4NGQxOWQ4ZTNiNmQiLCJpYXQiOjE2NjkyMzkyMjEuMzYwNzgxLCJuYmYiOjE2NjkyMzkyMjEuMzYwNzgzLCJleHAiOjE3MDA3NzUyMjEuMzU1ODI2LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.UgnoaSdExFpHUkGOYnkI5wg4683Ck8SDELIWes0FqS2MbLsBvLy0_fSg7-cc3YjGjmlxjz9gEHYVqFDKOLnzjuV658qkgngkTto5v4gY8Bg83G_ihGOF9Nmk5qHJ5ko7MpDNxMHW3wfn8DyqoE4u-6uEFosf2c2gOMbs0eoD1l2Svx-CvjeuqOKpnd10XfLcdu4Aleswq_fvdWfPa6euuPd8_8A-YpFFfX86Pya2LNVnMb2g7bP9ZUg4xXmdNm3WEea0H0nc7B0LBRU4WxezhaXgBeGib8vq5-rB-gSwqtT77dBO4eOyGAcqde7Kwqyze2YRcYw_MF-LhKKFPSjElTaPFlQbGcrbP7m1aVzCHAcAs7iac9bSuFXTG3mvKxEyztDUZ7IAugEPQNAR5fmjQKtqAMFEMAsC_ouWcxPo8rA4QpTgm3vleNgC7-6rjhxZ9DJuf2t9FNE3PC9rlAISk5zr1AatF_S6nX6Dn4EVaVXTyJihOiUXpyv_J1A49xA7UChVRWl8OvJOF783HwQZ6vRFVhLUZrUFLYHD82XnK1rmldTw9RSDACddlUalnJ1kjRJjbIDUPXjRKJnVhgC6-KqcWzdmn4Yd89Z2bhm6gS9o7aslzMESUrZFIVaaqbrwDdIFveiU-4Q-mWLSm6RL6AynjQWd5BGdibLcOOUYsFo"
          //   }
          // }
        }
      }
    )
  }
  isFormValid(){

    return (this.existingUser.email && validateEmail(this.existingUser.email)
    && this.existingUser.password && this.existingUser.password.length > 5) && this.trial < this._auth.maxLoginAttempt;
  }
  signup(){
    this.router.navigate(['auth/register']);
  }
  forgotPassword(){
    this.router.navigate(['auth/forgot-password']);
  }
  clearErrorForm(){
    const signinEmail = (<HTMLInputElement>document.getElementById("signinEmail"));
    const signinPassword = (<HTMLInputElement>document.getElementById("signinPassword"));
    if(signinEmail.classList.contains("formError")){
      signinEmail.classList.remove("formError");
    }
    if(signinPassword.classList.contains("formError")){
      signinPassword.classList.remove("formError");
    }
    this.errorMessage = '';
    return {
      email: signinEmail, password: signinPassword
    }
  }

}
