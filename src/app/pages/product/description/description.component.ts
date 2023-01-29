import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  @Input() product:any = null;

  constructor() { }

  ngOnInit(): void {
  }

}
