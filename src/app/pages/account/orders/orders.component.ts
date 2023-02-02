import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders:Array<any> = [ ];
  selectedOrders: any=null;
  constructor(private _order: OrdersService) { }

  ngOnInit(): void {
    this._order.getOrders().subscribe(
      (response:any)=>{
        this._order.list.next(response);
        console.log("======");
        console.log("Subscribe");
        console.log(response);
        this.orders = response
        console.log("======");
      }
    )

  }
  showOrder(order:any){
    console.log(order)
  }

}
