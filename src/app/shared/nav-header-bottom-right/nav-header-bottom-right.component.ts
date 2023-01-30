import { AuthService } from 'src/app/services/auth.service';
import { map, concatMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'nav-header-bottom-right',
  templateUrl: './nav-header-bottom-right.component.html',
  styleUrls: ['./nav-header-bottom-right.component.css']
})
export class NavHeaderBottomRightComponent implements OnInit {
  @Input() categories: Array<any> = [];
  @Input() stores: Array<any> = [];
  cartLength:number =0;
  balance:any = 0;
  constructor(private router: Router, private _cart:CartService, private _auth:AuthService) { }

  ngOnInit(): void {
    this._cart.get(this._auth.access_token.value).subscribe(
      (list:Array<any>)=>{
        if(this._auth.access_token.value){
          this.cartLength = list.length;
          this._cart.list.next(list);
        }
        console.log(list);
        console.log(this.cartLength);
      }
    )

    this.getbalance()
  }
  goToCart(){
    this.router.navigate(['checkout']);
  }
  getbalance(){
    return this._cart.list.pipe(
      map((carts:any)=>{
        let total = 0;
        for(let i=0; i<carts.length;i++){
          const cart = carts[i];
          console.log(cart)
          total += cart?.quantity * cart?.price;
        }
        return {
          carts,
          total
        }
      })
    ).subscribe((t:any)=>{
      this.balance = t.total;
      this.cartLength = t.carts.length;
    });
  }
}
