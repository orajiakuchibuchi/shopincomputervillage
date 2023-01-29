import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  user: any = {
    current_password: '',
    new_password: '',
    confirm_password: '',
  }
  errorMessage: string = 'Change your account password';
  constructor(private _auth:AuthService, private loader:LoaderService, private notify: NotificationService) { }

  ngOnInit(): void {
  }
  savePassword(){
    this.errorMessage = '';
    if(!this.user.current_password){
      this.errorMessage = 'Please fill in your current password';
      window.scrollTo({
        top: 400,
        behavior: 'smooth',
      });
      return;
    }
    if(!this.user.new_password){
      this.errorMessage = 'Please fill in your new password';
      window.scrollTo({
        top: 400,
        behavior: 'smooth',
      });
      return;
    }
    if(this.user.new_password !== this.user.confirm_password){
      this.errorMessage = 'Please make sure your new password matches the confirmation password';
      window.scrollTo({
        top: 400,
        behavior: 'smooth',
      });
      return;
    }
    this.loader.show();
    let formData = new FormData();
    formData.append('new_password',this.user.new_password);
    formData.append('new_password_confirmation',this.user.confirm_password);
    formData.append('old_password',this.user.current_password);
    this._auth.changePassword(formData).pipe(
      tap((res:any)=>{
        console.log(res);
      }),
      catchError((err:any)=>{
        let response = err;
        if(Array.isArray(response.message)){
          response.message.map(
            (err: string) => {
              this.errorMessage += `${err} \n`;
            }
          );
        }else{
          this.errorMessage = response.message;
        }
        this.loader.hide();
        window.scrollTo({
          top: 400,
          behavior: 'smooth',
        });
        return throwError(err);
      })
    ).subscribe(
      (response:any)=>{
        this.loader.hide();
        console.log(response);
        this.notify.openSuccess('Notification', response.message);
        this.user =  {
          current_password: '',
          new_password: '',
          confirm_password: '',
        }
        this.errorMessage ='Change your account password';
      }
    );
  }

}
