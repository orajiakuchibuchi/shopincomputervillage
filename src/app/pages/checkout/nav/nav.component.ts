import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'checkout-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input() title:string='Checkout'
  @Input() cartLevel:boolean=false;
  constructor(private loader: LoaderService, private router:Router) { }

  ngOnInit(): void {
  }
  goHome() {
    this.loader.show();
    this.router.navigate([`home`]).finally(
      ()=>{
        setTimeout(() => {
          this.loader.hide();
        }, 500);
      }
    )
  }
  goShop() {
    this.loader.show();
    this.router.navigate([`checkout/cart`]).finally(
      ()=>{
        setTimeout(() => {
          this.loader.hide();
        }, 500);
      }
    )
  }

}
