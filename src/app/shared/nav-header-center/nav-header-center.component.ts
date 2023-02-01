import { map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'nav-header-center',
  templateUrl: './nav-header-center.component.html',
  styleUrls: ['./nav-header-center.component.css']
})
export class NavHeaderCenterComponent implements OnInit {
  @Input() categories: Array<any> = [];
  @Input() stores: Array<any> = [];
  cartLength:number =0;
  balance:number =0;
  constructor(private router: Router, private loader: LoaderService,
    public store: StoreService,
    private _cart: CartService, public _auth: AuthService) { }

  ngOnInit(): void {
    this._auth.status.pipe(
      tap(
        (res)=>{
          if(res){
            this.getFromServer();
          }
          return res;
        }
      )
    ).subscribe();
    this.store.getStores().subscribe(
      (data:any)=>{
        // this.store.list.next(data);
      }
    )

    this.getbalance();
  }
  getFromServer(){
    this._cart.get(this._auth.access_token.value).subscribe(
      (list:Array<any>)=>{
        if(this._auth.access_token.value){
          this.cartLength = list.length;
          this._cart.list.next(list);
        }
      }
    );
  }
  goToshop(shop=null){
    this.router.navigate(['shop']).finally(()=>{
      const closeMenuMobile = (<HTMLButtonElement>document.getElementById("closeMenuMobile"));
      if(closeMenuMobile){
        closeMenuMobile.click();
      }
    });
  }
  goTo(page:string){
    this.router.navigate(['account/'+page]).finally(()=>{
      const closeMenuMobile = (<HTMLButtonElement>document.getElementById("closeMenuMobile"));
      if(closeMenuMobile){
        closeMenuMobile.click();
      }
    });
  }
  goToPage(page:string){
    this.router.navigate([page]).finally(()=>{
      const closeMenuMobile = (<HTMLButtonElement>document.getElementById("closeMenuMobile"));
      if(closeMenuMobile){
        closeMenuMobile.click();
      }
    });
  }
  goTohome(){
    this.router.navigate(['home']).finally(()=>{
      const closeMenuMobile = (<HTMLButtonElement>document.getElementById("closeMenuMobile"));
      if(closeMenuMobile){
        closeMenuMobile.click();
      }
    });
  }
  checkout(rout:string){
    this.router.navigate([`checkout/${rout}`]).finally(()=>{
      const closeMenuMobile = (<HTMLButtonElement>document.getElementById("closeMenuMobile"));
      if(closeMenuMobile){
        closeMenuMobile.click();
      }
    });
  }
  authenticate(){
    const closeMenuMobile = (<HTMLButtonElement>document.getElementById("closeMenuMobile"));
    const sidebarNavToggler = (<HTMLLinkElement>document.getElementById("sidebarNavToggler"));
    if(sidebarNavToggler){
      sidebarNavToggler.click();
    }
    this.loader.show();
    setTimeout(() => {
      sidebarNavToggler.click();
      this.loader.hide();
    }, 2000);
  }
  goToCart(){
    this.router.navigate(['checkout']);
  }
  goToAccount(){
    this.router.navigate(['account/dashboard']);
  }
  getbalance(){
    return this._cart.list.pipe(
      map((carts:any)=>{
        let total = 0;
        for(let i=0; i<carts.length;i++){
          const cart = carts[i];
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
