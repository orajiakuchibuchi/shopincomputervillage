import { tap, map } from 'rxjs/operators';
import { ErrorFormat } from './../../../module/models/ErrorFormat';
import { User } from './../../../module/models/user.model';
import { AuthService } from './../../../services/auth.service';
import { TranslatorService } from './../../../services/translator.service';
import { FormModalComponent } from './../../../shared/form-modal/form-modal.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerRoute: any = {
    name: 'Login',
    url: 'auth/login'
  };
  registrationForm: FormGroup =  new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    admin: new FormControl('0'),
    user: new FormControl('0'),
    email: new FormControl('', [Validators.required, Validators.email])
  });
  constructor(public translate: TranslatorService,
              private authService: AuthService,
              private cookieService: CookieService) { }

  ngOnInit(): void {
    console.log("Loading");
    this.authService.status.subscribe(x=>{
      console.log(x);
    });
  }
  getRegistrationForm(){
    return this.registrationForm.controls;
  }
  async onSubmit(){
    (<HTMLInputElement>document.getElementById("username")).style.border = "1px solid #d4d4d4";
    (<HTMLInputElement>document.getElementById("password")).style.border = "1px solid #d4d4d4";
    if(this.getRegistrationForm().password.valid && this.getRegistrationForm().email.valid){
      if(this.forgotToSelectRole()){
        const translated = await this.translate.get(['auth.forgotRoleMessage', 'invalidFormTitle', 'error', 'btnClose']).toPromise();
        FormModalComponent.prompt(translated['invalidFormTitle'], undefined, 'error', translated['btnClose'], translated['auth.forgotRoleMessage']);
      }else{
        const translated = await this.translate.get(['validFormMessage', 'validFormTitle', 'success', 'btnClose', 'btnProceed', 'registration.success.message', 'registration.success.title']).toPromise();
        FormModalComponent.prompt(translated['validFormTitle'], undefined, 'success', translated['btnClose'], translated['validFormMessage']);
        // Toast loader and make api call
        const form = {
                        email : this.getRegistrationForm().email.value,
                        password: this.getRegistrationForm().password.value,
                        confirmPassword: this.getRegistrationForm().password.value,
                        role: this.getRegistrationForm().user.value === '1' ?
                              'Customer' : 'Store Owner' };
        // this.authService.regiser(form).subscribe((data: User | Boolean)=> {
        //   FormModalComponent.close(100);
        //   if(data instanceof User){
        //     // User is authenticated
        //     console.log("User: ", data.email);
        //     var expires = new Date();
        //     expires.setMinutes(expires.getMinutes() + 30);
        //     this.cookieService.setCookie('auth.user', data, expires);
        //     FormModalComponent.prompt(translated['registration.success.title'], '/dashboard', 'success', translated['btnProceed'], translated['registration.success.message'], 500);
        //   }else{
        //     // FormModalComponent.prompt(translated[data.type], undefined, 'error', translated['btnClose'], data.message, 500);
        //     // console.log("Error: ", data.message);
        //   }
        // })
      }
    }else{
      this.validateFormError();
    }
  }
  validateFormError(){
    let message = '';
    Object.keys(this.getRegistrationForm()).forEach(key => {
      const input = this.getRegistrationForm()[key];
      if(key === 'admin' || key === 'user'){
        if(this.forgotToSelectRole()){
          if(!message.includes('Seems like you forgot to select your login role')){
            message += 'Seems like you forgot to select your login role.\n';
          }
          (<HTMLInputElement>document.getElementById(key)).style.border = "1px solid red";
          (<HTMLInputElement>document.getElementById(key)).classList.add('shakeit');
          setTimeout(() => {
            (<HTMLInputElement>document.getElementById(key)).classList.remove('shakeit');
          }, 3000);
        }
      }else{
        if(input.invalid){
          if(key === 'email' || key === 'username'){
            message += "ensure to input your email/username\n";
            const usernameId = (<HTMLInputElement>document.getElementById("username"));
            usernameId.style.border = "1px solid red";
            usernameId.classList.add('shakeit');
            setTimeout(() => {
              usernameId.classList.remove('shakeit');
            }, 3000);
          }else{
            const keyId = (<HTMLInputElement>document.getElementById(key));
            message += "ensure to to fill in your password. Hint consider the password rule\n";
            keyId.style.border = "1px solid red";
            keyId.classList.add('shakeit');
            setTimeout(() => {
              keyId.classList.remove('shakeit');
            }, 3000);
          }
        }
      }
    });
    FormModalComponent.prompt('Form Invalid', undefined, 'error', 'Close', message);
    FormModalComponent.close(10000);
  }
  forgotToSelectRole(){
    return this.getRegistrationForm().admin.value === '0' && this.getRegistrationForm().user.value === '0';
  }
  toggleRole(value:string){
    (<HTMLInputElement>document.getElementById("admin")).style.border = "1px solid #d4d4d4";
    (<HTMLInputElement>document.getElementById("user")).style.border = "1px solid #d4d4d4";
    if(value === 'user'){
      this.getRegistrationForm().user.setValue('1');
      this.getRegistrationForm().admin.setValue('0');
    }else if (value === 'admin'){
      this.getRegistrationForm().user.setValue('0');
      this.getRegistrationForm().admin.setValue('1');
    }
  }
}
