import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-stat',
  templateUrl: './order-stat.component.html',
  styleUrls: ['./order-stat.component.css']
})
export class OrderStatComponent implements OnInit {
  @Input() orderLength:any = 0;
  constructor(private router: Router, private _order:OrdersService, private loader:LoaderService) { }

  ngOnInit(): void {
    this._order.getOrders().subscribe(
      (response:any)=>{
        this._order.list.next(response);
      }
    );
    this._order.list.subscribe(
      (value:any)=>{
        this.orderLength = value.length;
      }
    )
  }
  shopPage(){
    this.router.navigate(['shop'])

  }

}
