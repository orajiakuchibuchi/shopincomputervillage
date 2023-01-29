import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.css']
})
export class TopRatedComponent implements OnInit {
  @Input() products:Array<any> = []
  constructor() { }

  ngOnInit(): void {
  }

}
