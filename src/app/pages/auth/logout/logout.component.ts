import { BlockchainService } from './../../../services/blockchain.service';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  loginRoute: any = {
    name: 'Login',
    url: 'auth/login'
  };

  constructor(private AuthService: AuthService,
              private cookieService: CookieService,
              private router :Router,
              private blockchainService: BlockchainService) { }

  ngOnInit(): void {
    let user = this.blockchainService.getuser();
    if(user){
      user.logout();
      setTimeout(()=>{
        this.router.navigate(['/auth/login']);
      },3000)
    }else{
      this.router.navigate(['/auth/login']);
    }
  }

}
