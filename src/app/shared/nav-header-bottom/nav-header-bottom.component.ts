import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nav-header-bottom',
  templateUrl: './nav-header-bottom.component.html',
  styleUrls: ['./nav-header-bottom.component.css']
})
export class NavHeaderBottomComponent implements OnInit {
  @Input() categories: Array<any> = [];
  @Input() stores: Array<any> = [];
  constructor() { }

  ngOnInit(): void {
  }

}
