import { SimpleModalService } from 'ngx-simple-modal';
import { Component, OnInit, Input } from '@angular/core';
import { WishlistContentComponent } from './wishlist-content/wishlist-content.component';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  @Input() product:any = null;
  @Input() showModal:boolean = false;
  constructor(private SimpleModalService: SimpleModalService,
              private productService: ProductService) { }

  ngOnInit(): void {
  }
  showContent() {
    if(this.showModal){
      this.SimpleModalService.addModal(WishlistContentComponent, {product: this.product});
    }else if(this.product){
      if(this.product.length){
        if(this.addedAlready(this.product[0])){
          
        }else{

        }
      }else{
        if(this.addedAlready(this.product)){
          // this.product.wishlist = !this.product.wishlist;
        }else{
          // this.product.wishlist = true;
        }
      }
    }
  }

  addedAlready(product:any){
    return product.wishlist;
  }
  getProduct(){
    if(this.product !== null){
      if(this.product.length){
        return this.product[0];
      }
    }
    return this.product;
  }

}
