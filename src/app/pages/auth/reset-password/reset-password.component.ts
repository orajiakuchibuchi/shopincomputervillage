import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  registerRoute: any = {
    name: 'Login',
    url: 'auth/login'
  };
  constructor() { }

  ngOnInit(): void {
  }

}
