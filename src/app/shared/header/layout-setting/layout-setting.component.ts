import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-setting',
  templateUrl: './layout-setting.component.html',
  styleUrls: ['./layout-setting.component.css']
})
export class LayoutSettingComponent implements OnInit {
  cartCount: any = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
