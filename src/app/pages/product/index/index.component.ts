import { AuthService } from 'src/app/services/auth.service';
import { CartService } from './../../../services/cart.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, map, catchError } from 'rxjs/operators';
import { concat, Observable, throwError } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  product: any = {
    images: [
      {
        file_path: 'assets/img/720X660/img5.jpg',
        showing: true,
      },
      {
        file_path: 'assets/img/380X350/consal.png',
        showing: false,
      }
    ]
  }
  addingToCart:any = {
    quantity: 1,
    added: false
  }
  productRouteObserver: Observable<any> = new Observable<any>();
  productID: any = null;
  processing: boolean = false;
  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private _cart: CartService,
    private _auth: AuthService,
    private notify: NotificationService,
    private router: Router, private loader: LoaderService) { }

  ngOnInit(): void {
    this.productRouteObserver = this.productService.displayingProduct.pipe(
      concatMap(
        (data:any)=>{
          if(data){
            data['images'] = [
              {
                file_path: data.image,
                showing: true,
              },
              {
                file_path: data.image,
                showing: false,
              },
              {
                file_path: data.image,
                showing: false,
              },
              {
                file_path: data.image,
                showing: false,
              }
            ];
            this.product = data;
          }
          return this.route.params.pipe(
            map((params: any) => {
              if (params['id']) {
                this.productID = params['id'];
              }else if(data){
                this.productID = data.id;
              }
              return this.productID;
            })
          );
        }
      )
    );
    this.productRouteObserver
    .pipe(
      concatMap((id:any)=>{
        if(!id){
          return this.router.navigate(['shop']);
        }else{
          if(!this.product.name){
            this.loader.show();
          }
          return this.productService.getProduct(id).pipe(
            map((data:any)=>{
              if(data){
                data['images'] = [
                  {
                    file_path: data.image,
                    showing: true,
                  },
                  {
                    file_path: data.image,
                    showing: false,
                  },
                  {
                    file_path: data.image,
                    showing: false,
                  },
                  {
                    file_path: data.image,
                    showing: false,
                  }
                ];
                this.product = data;
              }
              return data;
            })
          );
        }
      })
    )
    .subscribe(
      (data:any)=>{
        console.log(data)
        let images = [];
        if(data.image1){
          images.push(
            {
              file_path: data.image1,
              showing: true,
            }
          )
        }
        if(data.image2){
          images.push(
            {
              file_path: data.image2,
              showing: false,
            }
          )
        }
        if(data.image3){
          images.push({
            file_path: data.image3,
            showing: false,
          })
        }
        if(data.image4){
          images.push(
            {
              file_path: data.image4,
              showing: false,
            }
          )
        }
        if(data.image5){
          images.push(
            {
              file_path: data.image5,
              showing: false,
            }
          )
        }
        if(data.image6){
          images.push(
            {
              file_path: data.image6,
              showing: false,
            }
          )
        }
        data.images = images;
        this.product = data;
        this.loader.hide();
        this.checkInCart();
      }
    )
  }

  checkInCart(){
    let _id = '';
    if(typeof this.product.id == 'number'){
      _id = `${this.product.id} - ${this._auth.access_token.value}`
    }else{
      _id = this.product.id;
    }
    this.processing = true;
    this._cart.list.subscribe(
      (carts:Array<any>)=>{
        let crt = carts.find(
          (c:any)=>{
            return _id === c.id
          }
        )
        if(crt){
          this.addingToCart.added = true;
          this.addingToCart.quantity = crt.cart.quantity;
          this.product.cart = this.addingToCart;
          let productToPost = this.product;
          productToPost.access_token = this._auth.access_token.value;
          productToPost._id = productToPost.id;
          productToPost.id = `${productToPost._id} - ${this._auth.access_token.value}`
          this.product = productToPost;
        }

        this.processing = false;
      }
    )
  }
  decrease(){
    this.addingToCart.quantity > 1 ? this.addingToCart.quantity-- : this.addingToCart.quantity=1;
  }
  increase(){
    this.product.quantity > this.addingToCart.quantity ? this.addingToCart.quantity++ : this.addingToCart.quantity=this.product.quantity;
  }
  addToCart(client = false){
    this.addingToCart.added = true;
    this.product.cart = this.addingToCart;
    const list = this._cart.list.value;
    list.push(this.product);
    this._cart.list.next(list);
    if(!client){
      this.processing = true;
      let productToPost = this.product;
      productToPost.access_token = this._auth.access_token.value;
      productToPost._id = productToPost.id;
      productToPost.id = `${productToPost._id} - ${this._auth.access_token.value}`

      this._cart.add(productToPost)
      .pipe(
        catchError((error:any)=>{
          this.processing = false;
          // this.removeFromCart(true);
          this.notify.openInfo('Item exists', `${this.product.name} already exists in cart`);
          return throwError(error);
        })
      )
      .subscribe(
        (response:any)=>{
          this.processing =  false;
          this.product = response;
        }
      )
    }
  }
  removeFromCart(client = false){
    this.addingToCart.added = false;
    this.product.cart = null;
    const list = this._cart.list.value;
    const index = list.findIndex((prod:any)=>{return prod.meta_name == this.productID});
    if(index > -1){
      list.splice(index,1)
    }
    console.log(index)
    this._cart.list.next(list);
    if(!client){
      this.processing = true;
      let productToPost = this.product;
      productToPost.access_token = this._auth.access_token.value;
      productToPost._id = productToPost.id;
      productToPost.id = `${productToPost._id} - ${this._auth.access_token.value}`
      this._cart.delete(productToPost)
      .pipe(
        catchError((error:any)=>{
          this.processing = false;
          this.addToCart(true);
          return throwError(error);
        })
      )
      .subscribe(
        (response:any)=>{
          this.processing =  false;
          console.log(response);
        }
      )
    }
  }

  next() {
    let active = this.product.images.findIndex(
      (img: any) => {
        return img.showing;
      }
    )
    if (active > -1) {
      if (active + 1 < this.product.images) {
        let newIndex = active + 1;
        this.setAsActive(this.product.images[newIndex], newIndex)
      }
      this.setAsActive(this.product.images[0], 0)
    }
    console.log(active)
  }
  get getImage() {
    let active = this.product.images.find(
      (img: any) => {
        return img.showing;
      }
    );
    console.log(active);
    return active;
  }
  previous() {
    let active = this.product.images.findIndex(
      (img: any) => {
        return img.showing;
      }
    )
    if (active > -1) {
      if (active - 1 >= 0) {
        let newIndex = active - 1;
        this.setAsActive(this.product.images[newIndex], newIndex)
      }
      this.setAsActive(this.product.images[this.product.images.length - 1], this.product.images.length - 1)
    }
    console.log(active)
  }
  setAsActive(item: any, index: any) {
    this.product.images = this.product.images.map(
      (image: any) => {
        image.showing = false;
        return image
      }
    );
    if (index >= this.product.images.length) {
      index = 0;
    }
    this.product.images[index] = this.product.images[1];
    this.product.images[1] = item;
    item.showing = true;
  }

}


