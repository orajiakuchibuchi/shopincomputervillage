import { CookieService } from 'src/app/services/cookie.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { handleError } from 'src/app/module/models/ErrorFormat';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private AuthService: AuthService, private cookieService: CookieService) { }

  ngOnInit(): void {
    document.body.className += 'login-page';
  }

}
