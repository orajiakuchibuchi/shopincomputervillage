import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { catchError, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Array<any> = [];
  balance:any = 0;
  constructor(private _auth: AuthService,
    private notify: NotificationService,
    private loader: LoaderService,
    public _cart: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartItems = this._cart.list.value;
    this._cart.get(this._auth.access_token.value).subscribe(
      (carts:any)=>{
        this.cartItems = carts;
        this._cart.list.next(this.cartItems);
      }
    );
    this.getbalance();
  }
  visitShop(){
    this.router.navigate(['shop']).finally(
      ()=>{
        setTimeout(() => {
          this.loader.hide();
        }, 500);
      }
    )
  }
  removeFromCart(cart:any, ind:any){
    const list = this._cart.list.value;
    list.splice(ind,1);
    this.cartItems.splice(ind,1);
    this._cart.list.next(list);
    cart._id = cart.id;
    this.cartItems = this._cart.list.value;
    this._cart.delete(cart)
    .pipe(
      catchError((error:any)=>{
        this.notify.openError('Opps', 'Opps something went wrong');
        return throwError(error);
      })
    )
    .subscribe(
      (response:any)=>{
        this.notify.openSuccess('Item removed', 'Cart item removed');
        console.log(response);
      }
    )
  }
  decrement(cart:any, index:any){
    let newVal = cart.cart.quantity -1;
    if(newVal > 1){
      cart.cart.quantity = newVal;
    }else{
      cart.cart.quantity = 1;
    }
    this.cartItems[index] = cart;
    this._cart.update(cart)
    .pipe(
      debounceTime(1500),
      distinctUntilChanged()
    )
    .subscribe(
      (c:any)=>{
        console.log(c);
      }
    )
    this._cart.list.next(this.cartItems);
  }
  increment(cart:any, index:any){
    let newVal = cart.cart.quantity + 1;
    console.log(newVal);
    console.log(cart.quantity);
    if(newVal < cart.quantity){
      cart.cart.quantity = newVal;
    }else{
      cart.cart.quantity = cart.quantity;
      this.notify.openInfo('Max available quantity', `The maximum available quantity for ${cart.name} is ${cart.quantity}`);
    }
    this.cartItems[index] = cart;
    this._cart.update(cart)
    .pipe(
      debounceTime(1500),
      distinctUntilChanged()
    )
    .subscribe(
      (c:any)=>{
        console.log(c);
      }
    )
    this._cart.list.next(this.cartItems);
  }
  checkout(){
    this.router.navigate(['checkout/clearance']).finally(
      ()=>{
        setTimeout(() => {
          this.loader.hide();
        }, 500);
      }
    )
  }
  getbalance(){
    return this._cart.list.pipe(
      map((carts:any)=>{
        let total = 0;
        for(let i=0; i<carts.length;i++){
          const cart = carts[i];
          total = cart?.cart.quantity * cart?.price;
        }
        return {
          carts,
          total
        }
      })
    ).subscribe((t:any)=>{
      this.balance = t.total;
    });
  }

}
