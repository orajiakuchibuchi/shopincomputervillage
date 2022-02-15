import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-nav',
  templateUrl: './auth-nav.component.html',
  styleUrls: ['./auth-nav.component.css']
})
export class AuthNavComponent implements OnInit {
  @Input() topRoute:any = [];
  constructor() { }
  ngOnInit(): void {
  }

}
