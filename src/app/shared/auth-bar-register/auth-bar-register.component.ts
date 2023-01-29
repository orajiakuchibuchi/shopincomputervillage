import { catchError } from 'rxjs/operators';
import { NetworkService } from 'src/app/services/network.service';
import { LoaderService } from 'src/app/services/loader.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NationalityService } from 'src/app/services/nationality.service';
import { throwError } from 'rxjs';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'auth-bar-register',
  templateUrl: './auth-bar-register.component.html',
  styleUrls: ['./auth-bar-register.component.css']
})
export class AuthBarRegisterComponent implements OnInit {
  newUser: any = {
    role: 'Buyer',
    title: '',
    first_name: '',
    last_name: '',
    country_prefix: '',
    phone_number: '',
    email: '',
    password: '',
    password_confirmation: ''
  }
  passwordType: string = 'password';
  errorMessage: string = '';
  successMessage: string = '';
  countryData: Array<any> = [];
  formTrial: number = 0;
  constructor(private nationalityService: NationalityService,
    private network: NetworkService,
    private cookieService: CookieService,
    private _auth: AuthService, private loader: LoaderService) { }

  ngOnInit(): void {
    this.countryData = this.nationalityService.localCountryData;
    this.errorMessage = '';
    this.successMessage = '';
  }
  attemptRegistration() {
    this.loader.show();
    this.errorMessage = '';
    let networkstatus = this.network.getStatus();
    if (networkstatus !== 'ONLINE') {
      this.errorMessage = 'Opps, your network is disconnected, please reconnect and try again';
      this.loader.hide();
      return;
    }
    this._auth.register(this.newUser)
      .pipe(
        catchError((err: any) => {
          console.log(err.error);
          this.errorMessage = err.error.error;
          this.loader.hide();
          return throwError(err);
        })
      )
      .subscribe(
        (response: any) => {
          this.loader.hide();
          if (response.status == 400) {
            if(Array.isArray(response.message)){
              response.message.map(
                (err: string) => {
                  this.errorMessage += `${err} \n`;
                }
              );
            }else{
              this.errorMessage = response.message;
            }
          } else {
            this.successMessage = response.message;
            this.loader.show();
            setTimeout(() => {
              localStorage.setItem("authToken", response.data.access_token);
              this.cookieService.setCookie("authUser", response.data);
              this._auth.access_token.next(
                response.data.access_token
              );
              this._auth.user.next(response.data);
              this._auth.status.next(
                true
              );
              this.loader.hide();
            }, 1500);
          }
          console.log(response);
        }
      )
  }

  isFormValid() {
    return this.newUser.title && this.newUser.title.length > 1
      && this.newUser.first_name && this.newUser.first_name.length > 1
      && this.newUser.last_name && this.newUser.last_name.length > 1
      && this.newUser.country_prefix && this.newUser.country_prefix.length > 1
      && this.newUser.phone_number && this.newUser.phone_number.length > 1
      && this.newUser.email && this.newUser.email.length > 1
      && this.newUser.password && this.newUser.password.length > 5
      && this.newUser.password_confirmation == this.newUser.password
      && this.newUser.password && this.newUser.password.length > 1;
  }

}
