import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { validateEmail } from 'src/app/core/utils/particles';
import { LoaderService } from 'src/app/services/loader.service';
import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'src/app/services/cookie.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'auth-bar-recover-password',
  templateUrl: './auth-bar-recover-password.component.html',
  styleUrls: ['./auth-bar-recover-password.component.css']
})
export class AuthBarRecoverPasswordComponent implements OnInit {
  email:string = '';
  code:string = '';
  errorMessage:string = '';
  showCodeField: boolean = false;
  forgotpassword: boolean = true;
  constructor(
    private router: Router,
    private network: NetworkService,
    private _auth: AuthService,
    private cookieService: CookieService,
    private loader: LoaderService) { }

  ngOnInit(): void {
  }
  confirmEmail(){
    return validateEmail(this.email);
  }
  login(){
    this.router.navigate(['auth/login']);
  }
  sendRequest(){
    this.errorMessage = '';
    if(this.network.getStatus() !== 'ONLINE'){
      this.errorMessage = 'Opps your network is disconnected. Please come back online and retry';
      return;
    }
    this.loader.show();
    let formData = new FormData();
    formData.append('verificationType', this.forgotpassword ? 'Password Reset' : 'One Time Login');
    formData.append('email',this.email);
    formData.append('app','buyer');
    this._auth.requestCode(formData)
    .pipe(
      catchError((err:any)=>{
        this.errorMessage = err;
        if(this.errorMessage == "Timeout has occurred"){
          this.showCodeField = true;
          this.errorMessage += ` Please check your inbox/spam folder for an email from us. Otherwise, please wait about 3-5 minutes and try again.`
        }
        return throwError(err);
      })
    )
    .subscribe(
      (data:any)=>{
        console.log(data);
        this.errorMessage = data.message;
        if(data.status == 200){
          this.showCodeField = true;
        }
        this.loader.hide();

      }
    );

  }
  verifyCodeRequest(){
    this.errorMessage = '';
    let formData = new FormData();
    formData.append('email',this.email);
    formData.append('code',this.code);
    this.loader.show()
    this._auth.verifyCode(formData).subscribe(
      (response:any)=>{
        console.log(response);
        this.loader.hide()
        this.errorMessage = response.message;
        if(response.status == 200){
          localStorage.setItem("authToken", response.data.access_token);
          this.cookieService.setCookie("authUser", response.data);
          this.cookieService.setCookie("authToken", response.data.access_token);

          this._auth.access_token.next(
            response.data.access_token
          );
          this._auth.status.next(
            true
          );
        }
      }
    )
  }

}
