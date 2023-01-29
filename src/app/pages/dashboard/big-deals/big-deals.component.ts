import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-big-deals',
  templateUrl: './big-deals.component.html',
  styleUrls: ['./big-deals.component.css']
})
export class BigDealsComponent implements OnInit {
  @Input() stores:Array<any> = [];
  constructor() { }

  ngOnInit(): void {
  }

}
