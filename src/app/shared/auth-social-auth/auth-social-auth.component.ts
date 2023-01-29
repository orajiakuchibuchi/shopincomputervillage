import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'auth-social-auth',
  templateUrl: './auth-social-auth.component.html',
  styleUrls: ['./auth-social-auth.component.css']
})
export class AuthSocialAuthComponent implements OnInit {

  constructor(private _auth:AuthService) { }
  
  ngOnInit(): void {
  }
  signInWith(type:string){
    this._auth.signInWithGoogle().then(
      (start:any)=>{
        console.log("Startinf");
        console.log(start);
      }
    ).finally(
      ()=>{
        console.log("finally");
      }
    ).catch((error:any)=>{
      console.log(error)
    })
  }

}
