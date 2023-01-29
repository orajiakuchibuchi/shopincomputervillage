import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders:Array<any> = [
    {
      "id": 67,
      "order_ref": "06009",
      "transaction_code": "e5ee9f49-fbb9-489b-80c9-d2139ce5a010",
      "product_id": "1",
      "product_name": "Product One",
      "product_meta_name": "2-product-one",
      "product_variance_id": "169",
      "product_variance_name": "Red",
      "product_return_policy": "10",
      "pickup_office_id": "2",
      "customer_id": "2",
      "customer_firstname": "Kelvin",
      "customer_lastname": "Mgbemele",
      "customer_email": "mgbemelekelvin@gmail.com",
      "customer_phone_number": "9060698110",
      "seller_id": "2",
      "store_id": "3",
      "store_name": "Fortune and sons limited",
      "store_url": null,
      "payment_type_name": "Cash",
      "transaction_type_name": "Product Purchase (Online Payment)",
      "quantity": "5",
      "currency_name": "Naira",
      "currency_symbol": "&#8358;",
      "amount": "2375",
      "commission": "5.6",
      "commission_amount": 133,
      "vat": "178.125",
      "dollar_rate": "0.0013605442176871",
      "shipping_fee": "450",
      "order_variance": "Red",
      "shipping_duration": "2",
      "delivery_status": null,
      "payment_status": "Unpaid",
      "status": "Awaiting Payment",
      "order_records": [],
      "day": "28",
      "month": "12",
      "year": "2022",
      "progressing_at": null,
      "delivered_at": null,
      "created_at": "2022-12-28 00:10:47",
      "total": null
  }
  ];
  selectedOrders: any=null;
  constructor(private _order: OrdersService) { }

  ngOnInit(): void {
    this._order.getOrders().subscribe(
      (response:any)=>{
        this._order.list.next(response);
        console.log("======");
        console.log("Subscribe");
        console.log(response);
        console.log("======");
      }
    )

  }
  showOrder(order:any){
    console.log(order)
  }

}
