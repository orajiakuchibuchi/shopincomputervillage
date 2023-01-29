import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.css']
})
export class BestSellerComponent implements OnInit {
  current: any = 'Best Seller';
  @Input() products: Array<any> = [];
  constructor() { }

  ngOnInit(): void {
  }

}
