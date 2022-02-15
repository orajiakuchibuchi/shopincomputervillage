import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  registerRoute: any = {
    name: 'Login',
    url: 'auth/login'
  };
  constructor() { }

  ngOnInit(): void {
  }

}
