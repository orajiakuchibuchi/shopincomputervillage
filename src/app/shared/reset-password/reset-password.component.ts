import { concatMap, tap, catchError } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { throwError } from 'rxjs';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  @Input() authCode: any = '';
  @Input() email: any = '';
  errorMessage: any = '';
  password:any = {
    new: '',
    confirm: '',
    type: 'password'
  }
  shouldlogin:boolean = false;
  constructor(private _auth: AuthService, private loader: LoaderService, private cookieService: CookieService) { }

  ngOnInit(): void {
  }
  togglePassword(){
    if(this.password.type == 'password'){
      this.password.type = 'text';
    }else{
      this.password.type = 'password';
    }
  }
  updatePAssword(){
    this.errorMessage =  '';
    if(this.password.new.length <6){
      this.errorMessage = 'Password must be up to 6';
      return;
    }
    if(this.password.new !== this.password.confirm){
      this.errorMessage = 'Password must match. Please click the lock icon to view password';
      return;
    }
    this.loader.show();
    let formData = new FormData();
    formData.append('new_password_confirmation', this.password.confirm);
    formData.append('new_password', this.password.new);
    formData.append('email', this.email);
    this._auth.resetForgotPasswordCode(formData)
    .pipe(
      concatMap((response:any)=>{
        this.errorMessage = response.message;
        if(response.status == 200){
          if(this.shouldlogin){
            formData.delete('new_password_confirmation');
            formData.delete('new_password');
            formData.append('password', this.password.new);
            return this._auth.login(formData).pipe(
              tap( (response:any)=>{
                if(response.status == 400){
                  this.errorMessage = `${response.message}`;
                }else if(response.status == 200){
                  localStorage.setItem("authToken",response.data.access_token );
                  this.cookieService.setCookie("authUser", response.data);
                  this._auth.user.next(response.data);
                  this._auth.access_token.next(
                    response.data.access_token
                  );
                  this._auth.status.next(
                    true
                  );
                  const dfsdlClose = (<HTMLElement>document.getElementById("dfsdlClose"));
                  dfsdlClose.click();
                }
              })
            );
          }
        }
        return response;
      }),
      catchError((err:any)=>{
        console.log(err);
        this.loader.hide()
        if(Array.isArray(err.message)){
          err.message.map(
            (err: string) => {
              this.errorMessage += `${err} \n`;
            }
          );
        }else{
          this.errorMessage = err.message;
        }
        return throwError(err);
      })
    )
    .subscribe(
      (response:any)=>{
        console.log(response);
        this.loader.hide();
        // this.errorMessage = response.message;
        // if(response.status == 200){
        //   if(this.shouldlogin){
        //     formData.delete('new_password_confirmation');
        //     formData.delete('new_password');
        //     formData.append('password', this.password);

        //   }
        // }
      }
    )
  }

}
