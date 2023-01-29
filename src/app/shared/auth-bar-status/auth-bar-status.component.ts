import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'auth-bar-status',
  templateUrl: './auth-bar-status.component.html',
  styleUrls: ['./auth-bar-status.component.css']
})
export class AuthBarStatusComponent implements OnInit {
  status:boolean = false;
  @Input() networkStatus:string = 'ONLINE';
  constructor(private _auth: AuthService, private loader: LoaderService, private router: Router) { }

  ngOnInit(): void {
    this._auth.status.subscribe(
      status=>this.status = status
    )
  }
  viewProfile(){
    this.router.navigate(['account/profile']);
  }
  logout(){
    this.loader.show();
    this._auth.logout({}).subscribe(
      (res:any)=>{
        this.loader.hide();
        if(res.status == 200){
          localStorage.removeItem("authToken");
          this._auth.access_token.next('');
          this._auth.status.next(false);
        }
      }
    )

  }

}
