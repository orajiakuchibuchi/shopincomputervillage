import { SimpleModalComponent } from 'ngx-simple-modal';
import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
export interface ProductModal {
  product?: any;
  text?: any;
  showing?: any;
  selectedVaiance?: any;
}
@Component({
  selector: 'app-wishlist-content',
  templateUrl: './wishlist-content.component.html',
  styleUrls: ['./wishlist-content.component.css']
})
export class WishlistContentComponent extends SimpleModalComponent<ProductModal, null> implements ProductModal, OnInit {
  @Input() product:any = null;
  @Input() text:boolean = false;
  @Input() showing:boolean = false;
  @Input() selectedVaiance:any = null;
  wishlists: Array<any> = [];
  constructor(private productService: ProductService) {
    super();
  }
  ngOnInit(): void {
    this.productService.wishlists.subscribe(w=>this.wishlists = w);
    this.productService.getWishLists().pipe(
      catchError((e:any)=>{
        console.log(e);
        return throwError(e);
      })
    ).subscribe(
      response => this.wishlists = response 
    )

  }
}
