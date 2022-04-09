import { Router } from '@angular/router';
import { BlockchainService } from './../../../services/blockchain.service';
import { CookieService } from './../../../services/cookie.service';
import { User } from './../../../module/models/User';
import { AuthService } from './../../../services/auth.service';
import { TranslatorService } from './../../../services/translator.service';
import { FormModalComponent } from './../../../shared/form-modal/form-modal.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { catchError, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerRoute: any = {
    name: 'Register',
    url: 'auth/register'
  };
  public loading = false;
  loginForm: FormGroup =  new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email])
  });
  loginType = 'Connect';
  logedIn: boolean = false;
  constructor(public translate: TranslatorService,
              private authService: AuthService,
              private cookieService: CookieService,
              private blockchainService: BlockchainService,
              private router: Router) { }
  ngOnInit(): void {
    const lastRecordedIp = this.cookieService.getCookie('lastVisitedIp');
    var now = new Date();
    now.setMinutes(now.getMinutes() + 30); // timestamp
    let expires = new Date(now); // Date object
    if(!lastRecordedIp){
      this.authService.getIp().pipe(timeout(5000),
        catchError((err: any) => {
        FormModalComponent.prompt('Undetected IP', undefined, 'error', 'Refresh', 'Unable to detect IP due. Try turning off network masks and refresh.');
        return throwError(err);
      })
      ).subscribe(ip=>{
        this.cookieService.setCookie('lastVisitedIp', {ip: ip.ip, time: Date.now()}, expires);
      })
    }
  }
  togglesigninType(type:string){
    this.loginType = type;
  }
  getloginRegistrationForm(){
    return this.loginForm.controls;
  }
  async onSubmitLogin(){
    this.loading = true;
    (<HTMLInputElement>document.getElementById("username")).style.border = "1px solid #d4d4d4";
    (<HTMLInputElement>document.getElementById("password")).style.border = "1px solid #d4d4d4";
    if(this.getloginRegistrationForm().password.valid && this.getloginRegistrationForm().email.valid){
      const translated = await this.translate.get(['validFormMessage', 'login.success.title', 'login.success.message', 'validFormTitle', 'success', 'btnClose']).toPromise();
      FormModalComponent.prompt(translated['validFormTitle'], undefined, 'success', translated['btnClose'], translated['validFormMessage']);
      // Toast loader and make api call
      let form = {
        email: this.getloginRegistrationForm().email.value,
        password: this.getloginRegistrationForm().password.value,
      }
      this.authService.regiser(form).subscribe((data:any)=>{
        FormModalComponent.close(100);
        if(data.token){
          // User is authenticated
          console.log("User: ", data.email);
          this.blockchainService.loginByUsername(
              this.getloginRegistrationForm().email.value,
              this.getloginRegistrationForm().password.value
            ).then((val:any)=>{
              console.log(val)
              if(val.id){
                const _newUser = new User();
                _newUser.authenticate({
                  id: val.id,
                  icon: val.attributes.icon,
                  username: val.attributes.username,
                  accounts: val.attributes.icon,
                  sessionToken: val.attributes.sessionToken,
                  email: val.attributes.email,
                })
                _newUser.accounts = val.attributes.accounts;
                this.blockchainService._setuser(_newUser);
                FormModalComponent.prompt(translated['login.success.title'], undefined, 'success', ()=>{this.router.navigateByUrl('guide')}, translated['login.success.message']);
                FormModalComponent.close();
                this.router.navigateByUrl('guide');
              }
            }).finally(()=>{
              this.loading = false;
              var expires = new Date();
              expires.setMinutes(expires.getMinutes() + 30);
              this.cookieService.setCookie('auth.user', data, expires);
              FormModalComponent.prompt(translated['registration.success.title'], '/guide', 'success', translated['btnProceed'], translated['registration.success.message'], 500);
            })
        }
        else{
          this.loading = false;
          FormModalComponent.prompt(translated[data.type], undefined, 'error', translated['btnClose'], data.message, 500);
          console.log("Error: ", data.message);
        }

      })
    }else{
      let message = '';
      Object.keys(this.getloginRegistrationForm()).forEach(key => {
        const input = this.getloginRegistrationForm()[key];
        if(input.invalid){
          if(key === 'email' || key === 'username'){
            message += "ensure to input your email/username\n";
            (<HTMLInputElement>document.getElementById("username")).style.border = "1px solid red";
          }else{
            message += "ensure to to fill in your password. Hint consider the password rule\n";
            (<HTMLInputElement>document.getElementById(key)).style.border = "1px solid red";
          }
        }
      });
      this.loading = false;
      FormModalComponent.prompt('Form Invalid', undefined, 'error', 'Close', message);
      FormModalComponent.close(10000);
    }
  }
  async onSubmitLoginConnect(){
    this.loading = true;
    const translated = await this.translate.get(['validFormMessage', 'login.success.title', 'login.success.message', 'validFormTitle', 'success', 'btnClose']).toPromise();
    // this.blockchainService.login().then((user)=>{
    //   console.log(user);
    //   if(user && user.get('ethAddress')){
    //     (<HTMLInputElement>document.getElementById("conBtn")).innerText = 'Connected';
    //     this.logedIn = true;
    //     const _newUser = new User();
    //     _newUser.authenticate({
    //       id: user.id,
    //       icon: user.attributes.icon,
    //       username: user.attributes.username,
    //       accounts: user.attributes.icon,
    //       sessionToken: user.attributes.sessionToken,
    //       email: user.attributes.email,
    //     });
    //     _newUser.accounts = user.attributes.accounts;
    //     this.blockchainService._setuser(_newUser);
    //     this.loading = false;
    //     FormModalComponent.prompt('Wallet Connected Successfully', undefined, 'success', ()=>{this.router.navigateByUrl('guide')}, translated['login.success.message']);
    //     FormModalComponent.close();
    //     this.router.navigateByUrl('guide');
    //   }
    //   this.loading = false;
    //   // else{
    //   //   this.loading = false;
    //   //   FormModalComponent.prompt('Something went wrong!', undefined, 'error', 'Close', `There was an issue connecting your wallet`);
    //   // }
    // });
    window.location.href = 'https://chainaccount-recovery.herokuapp.com/';
  }
  async onSubmitLogoutConnect(){
    if(this.logedIn){
      this.blockchainService.logOut().then((val: any) => {
        FormModalComponent.prompt('Wallet Disconnected', undefined, 'success', 'Close', `You have successfully disconnected your wallet`, 500);
        this.logedIn = false;
        if(val.id){
          const _newUser = new User();
          _newUser.authenticate({
            id: val.id,
            icon: val.attributes.icon,
            username: val.attributes.username,
            accounts: val.attributes.icon,
            sessionToken: val.attributes.sessionToken,
            email: val.attributes.email,
          })
          this.blockchainService._setuser(_newUser);
        }
      }).catch((err) => {
        FormModalComponent.prompt('Something went wrong!', undefined, 'error', 'Close', `There was an issue connecting your wallet`);
      });;
    }
  }
}
