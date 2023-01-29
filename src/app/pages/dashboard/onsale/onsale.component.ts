import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-onsale',
  templateUrl: './onsale.component.html',
  styleUrls: ['./onsale.component.css']
})
export class OnsaleComponent implements OnInit {
  @Input() products:Array<any> = []
  constructor() { }

  ngOnInit(): void {
  }

}
