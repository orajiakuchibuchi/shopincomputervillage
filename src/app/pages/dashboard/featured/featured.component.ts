import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent implements OnInit {
  @Input() products:Array<any> = []
  constructor() { }

  ngOnInit(): void {
  }

}
