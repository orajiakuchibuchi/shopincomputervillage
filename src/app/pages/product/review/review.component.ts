import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() product:any = null;
  constructor() { }

  ngOnInit(): void {
  }

}
