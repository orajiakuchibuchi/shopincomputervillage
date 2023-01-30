
import { Component, OnInit, Input } from '@angular/core';
import { SimpleModalComponent, SimpleModalService } from 'ngx-simple-modal';
import { Slider } from 'ngx-slider';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { NotificationService } from 'src/app/services/notification.service';
declare const $:any;

export interface ProductModal {
  product?: any;
  text?: any;
  showing?: any;
  selectedVaiance?: any;
}
@Component({
  selector: 'app-add-to-cart-modal-content',
  templateUrl: './add-to-cart-modal-content.component.html',
  styleUrls: ['./add-to-cart-modal-content.component.css']
})
export class AddToCartModalContentComponent extends SimpleModalComponent<ProductModal, null> implements ProductModal, OnInit {
  @Input() product:any = null;
  @Input() text:boolean = false;
  @Input() showing:boolean = false;
  @Input() selectedVaiance:any = null;
  @Input() selectedVarianceValue:any = null;
  public slider = new Slider();

  addingToCart:any = {
    quantity: 1,
    added: false
  }
  quantity:number = 1;

  constructor(private cartService: CartService, private notify: NotificationService, private authService: AuthService) {
    super();
    this.showing = false;
    this.slider.config.loop = true;
    this.slider.config.showPreview = true;
   }

  ngOnInit(): void {
    this.slider.items = [
      { src: this.product.image, title: this.product.name },
      { src: this.product.image2 ? this.product.image2 : this.product.image, title: this.product.name },
      { src: this.product.image3 ? this.product.image3 : this.product.image, title: this.product.name },
      { src: this.product.image4 ? this.product.image4 : this.product.image, title: this.product.name },
      { src: this.product.image5 ? this.product.image5 : this.product.image, title: this.product.name },
      { src: this.product.image6 ? this.product.image6 : this.product.image, title: this.product.name },
    ]
  }

  getDistinctKeys(variation:any, key:any){
    if(variation){
      let opt = [...new Set(variation.map((v:any) => v[key]))];
      return opt;
    }else{
      return [];
    }
  }
  save(){

  }
  add2Cart(product:any){
    if(!this.authService.status.value){
      this.notify.openInfo('Please Login', 'Please Login/Sign up to add item to cart');
      return;
    }
    let formData = new FormData();
    let cartItem:any = {
      image:product.image,
      product_meta_name:product.meta_name,
      product_name:product.name,
      quantity:this.quantity,
      price:product.price,
      type:'add',
      currency_id:1,
    }
    formData.append('product_meta_name',product.meta_name)
    formData.append('product_name',product.name)
    formData.append('quantity',JSON.stringify(this.quantity))
    formData.append('price',product.price)
    formData.append('type','add')
    formData.append('currency_id','1')
    if(this.selectedVaiance){
      console.log(this.product.product_variances)
      let vx = this.product.product_variances.find((v:any)=>{
        let namecheck = v.attribute_name == this.selectedVaiance;
        let selectedVarianceValue = v.value == this.selectedVarianceValue;
        return namecheck && selectedVarianceValue;
      });
      // console.log(vx)
      if(vx){
        cartItem.product_variance_id = vx.id;
        cartItem.product_variance_name= vx.value;
        formData.append('product_variance_id',vx.id)
        formData.append('product_variance_name',vx.value);
      }
    }
    // console.log(cartItem)
    let cartService = this.cartService.list.value;
    cartService.unshift(cartItem);
    this.cartService.list.next(cartService);
    this.cartService.add(formData).subscribe(
      (cart:any)=>{
        console.log(cart);
      }
    )
  }
  alreadyAdded(cart:any){
    let meta_name = this.cartService.list.value.find(c=>{
      if(this.selectedVaiance){
        // console.log(this.selectedVaiance);
        // console.log(c);
        // console.log(cart);
        let vx = this.product.product_variances.find((v:any)=>{
          let namecheck = v.attribute_name == this.selectedVaiance;
          let selectedVarianceValue = v.value == this.selectedVarianceValue;
          return namecheck && selectedVarianceValue;
        });
        return c.product_meta_name == cart.meta_name && 
        c.product_variance_id == vx.id
        && c.product_variance_name == this.selectedVarianceValue
      }
      return c.product_meta_name == cart.meta_name
    });
    if(meta_name){
      return true;
    }
    return false;
  }
  removeFromCart(cart:any){
    let cartList = this.cartService.list.value;
    let index = cartList.findIndex(c=>{
      if(this.selectedVaiance){
        let vx = this.product.product_variances.find((v:any)=>{
          let namecheck = v.attribute_name == this.selectedVaiance;
          let selectedVarianceValue = v.value == this.selectedVarianceValue;
          return namecheck && selectedVarianceValue;
        });
        return c.product_meta_name == cart.meta_name && 
        c.product_variance_id == vx.id
        && c.product_variance_name == this.selectedVarianceValue
      }
      return c.product_meta_name == cart.meta_name
    });
    if(index>-1){
      cartList = cartList.splice(index == 0 ? index : index-1,1);
      this.cartService.list.next(cartList);
    }
  }
  updateSelect(){
    // console.log($('.selectpicker'))
    $('.selectpicker').selectpicker();
  }
  decrease(){
    this.addingToCart.quantity > 1 ? this.addingToCart.quantity-- : this.addingToCart.quantity=1;
  }
  increase(){
    this.addingToCart.quantity++;
  }

}
