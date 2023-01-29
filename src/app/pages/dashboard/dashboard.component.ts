import { LoaderService } from 'src/app/services/loader.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreService } from './../../services/store.service';

import { tap, map, concatMap, catchError } from 'rxjs/operators';
import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { of, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
declare const $:any;
declare const ApexCharts:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy,AfterViewInit {
  balance:any = 0;
  contractBalance:any = 0;
  banner: any = {
    data: [
      'mountain-clipart-transparent-background-6.png',
      'string-lights-transparent-background-14.png',
      'transparent-fog-png-25.png',
      'vines-transparent-background-16.png',
      'water-transparent-background-17',
      'cloud-png-transparent-11.png',
    ],
    option:{
      "autoplay": true,
      "autoplaySpeed": 2000
    },
    index: 0,
    interval: null
  };
  routesub: any = null;
  authCode: any = null;
  authEmail: any = '';

  ethprice:any;
  routeData: any = {
    name: 'Dashboard',
    route: '/dashboard'
  }
  // check if element exists
  checkElement = async (selector:any) => {
    while ( document.querySelector(selector) === null) {
      await new Promise( resolve =>  requestAnimationFrame(resolve) )
    }
    return document.querySelector(selector);
  };
  products:Array<any> = [];
  stores:Array<any> = [];
  topTwoRated:Array<any> = new Array<any>();
  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private _auth: AuthService,
    private loader: LoaderService,
    private storeService: StoreService) { }

  async ngOnInit() {

    this.fetchProducts();
    this.fetchStores();
    this.banner.interval = setInterval(()=>{
      if(this.banner.index <= this.banner.data.length-1){
        this.banner.index++;
      }else{
        this.banner.index = 0;
      }
    },5000);
    this.routesub = this.route
    .data
    .pipe(
      concatMap(
        (v:any)=>{
          if(v.resettingPassword){
            this.loader.show();
            const resetPasswordModal = (<HTMLButtonElement>document.getElementById("lunchPasswordResetModal"));
            console.log(v);
            if(resetPasswordModal){
              resetPasswordModal.click();
            }
          }
          return this.route.params.pipe(
            concatMap(
              (params:any)=>{
                console.log(params);
                if(params.authToken){
                  this.authCode = params.authToken;
                  let formData = new FormData();
                  if(this.authCode.lastIndexOf("=") !== this.authCode.length -1){
                    formData.append('code', `${this.authCode}=`);
                  }else{
                    formData.append('code', `${this.authCode}`);
                  }
                  return this._auth.verifyForgotPasswordCode(formData).pipe(
                    catchError((err:any)=>{
                      this.router.navigate(['']).finally(()=>{
                        window.location.reload();
                      });
                      return throwError(err);
                    })
                  );
                }
                return of({
                  status: 200,
                  data: {
                    email: ''
                  }
                });
              }
            )
          );
        }
      )
    )
    .subscribe(res => {
      this.loader.hide();
      console.log(res)
      if(res.status == 400){
        this.router.navigate(['']).finally(()=>{
          window.location.reload();
        });
      }else{
        this.authEmail = res.data.email;
      }
    });
  }
  async ngAfterViewInit() {
    try {
      await this.checkElement('.js-slick-carousel');
      // console.log("found")
      $.HSCore.components.HSSlickCarousel.init('.js-slick-carousel');

    } catch (error) {
      console.log(error)
    }

  }
  fetchProducts(){
    this.products = this.productService.list.getValue();
    this.productService.getProducts(40, 1, 1).subscribe(
      (response:any)=>{
        console.log(response);
        // this.productService.list.next(response.data);
        this.products = this.productService.list.getValue();
        console.log(this.products)
      }
    )
  }
  fetchStores(){
    this.storeService.list.subscribe(list=>{
      this.stores = list.sort((obj1, obj2) => {
        if (parseInt(obj1.total_store_rating) > parseInt(obj2.total_store_rating)) {
            return 1;
        }

        if (parseInt(obj1.total_store_rating) < parseInt(obj2.total_store_rating)) {
            return -1;
        }
        return 0;
    }).reverse();
    this.topTwoRated = [];
    this.topTwoRated.push(this.stores[0]);
    this.topTwoRated.push(this.stores[1]);
    });
  }
  async ngOnDestroy() {
    clearInterval(this.banner.interval);
    this.banner.interval = null;
  }

  getRandomNumber(min:any, max:any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min) )
  }

  goToshop(){
    this.loader.show();
    this.router.navigate(['shop']).finally(
      ()=>{
        setTimeout(() => {
          this.loader.hide();
        }, 500);
      }
    );
  }
}
