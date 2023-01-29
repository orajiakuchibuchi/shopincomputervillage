import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';
import { LoaderService } from 'src/app/services/loader.service';
import { map, concatMap, catchError } from 'rxjs/operators';
import { forkJoin, of, throwError } from 'rxjs';
import { UserManagementService } from 'src/app/services/user-management.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any = {
    title: '',
    first_name: '',
    last_name:'',
    gender:'',
    house_address:'',
    country_id:'',
    state_id:'',
    lga_id:'',
    ward_id:'',
    state_of_origin:'',
    marital_status:'',
    religion:'',
    nationality:'',
    date_of_birth:'',
    middle_name:'',
    country_prefix:'',
    phone_number:'',
    currency_id:'',
    email: ''
  };
  userObserver: any = null;
  addressObserver:any = null;
  constructor(private cookie:CookieService,
    private _auth: AuthService,
    private loader: LoaderService,
    private notify: NotificationService,
    public userManagement: UserManagementService) { }

  ngOnInit(): void {
    let user = this._auth.user.value;
    const id = user.id;
    console.log(user);
    this.userObserver = this._auth.getUserDetails(id).pipe(
      map(
        (res:any)=>{
          return res.data;
        }
      ),
      catchError((err:any)=>{
        console.log(err);
        this.loader.hide();
        return throwError(err);
      })
    );
    this.addressObserver = forkJoin(
      [this.userManagement.fetchCountryList(), this.userManagement.fetchStatesList(),
        this.userManagement.fetchLGAList(), this.userManagement.fetchWardList(), this.userManagement.fetchBankList()]).subscribe(result => {
      console.log(result);
      this.userManagement.country_list.next(result[0]);
      this.userManagement.state_list.next(result[1]);
      this.userManagement.lga_list.next(result[2]);
      this.userManagement.ward_list.next(result[3]);
      this.userManagement.bank_list.next(result[4]);
     });
     if(!user.first_name){
      this.loader.show();
      this.userObserver.subscribe(
        (_user:any)=>{
          this.loader.hide();
          this._auth.user.next(_user);
        }
      )
    }
    this._auth.user.subscribe(
      (_user:any)=>{
        this.user = _user;
      }
    );
  }
  saveAddress(){
    let formData = new FormData();
    formData.append('country_id',this.user.country_id);
    formData.append('state_id',this.user.state_id);
    formData.append('lga_id',this.user.lga_id);
    formData.append('ward_id',this.user.ward_id);
    formData.append('house_address',this.user.house_address);
    this.loader.show();
    this.userManagement.patchUser(formData,this.user.id)
    .pipe(
      catchError((err:any)=>{
        this.loader.hide();
        console.log(err);
        return throwError(err);
      })
    )
    .subscribe(
      (response:any)=>{
        this.loader.hide();
        if(response.status == 200){
          this.cookie.setCookie('authUser', response.data);
          this._auth.user.next(response.data);
          this.notify.openSuccess('Notification', response.message);
        }
        console.log(response);
      }
    );
  }
  savePersonal(){
    let formData = new FormData();
    formData.append('email',this.user.email);
    formData.append('title',this.user.title);
    formData.append('first_name',this.user.first_name);
    formData.append('last_name',this.user.last_name);
    formData.append('middle_name',this.user.middle_name);
    formData.append('country_prefix',this.user.country_prefix);
    formData.append('phone_number',this.user.phone_number);
    this.loader.show();
    this.userManagement.patchUser(formData, this.user.id)
    .pipe(
      catchError((err:any)=>{
        this.loader.hide();
        console.log(err);
        return throwError(err);
      })
    )
    .subscribe(
      (response:any)=>{
        this.loader.hide();
        if(response.status == 200){
          this.cookie.setCookie('authUser', response.data);
          this._auth.user.next(response.data);
          this.notify.openSuccess('Notification', response.message);
        }
        console.log(response);
      }
    );
  }

}
