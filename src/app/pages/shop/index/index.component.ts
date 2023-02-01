import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import {  Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
declare const $: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  products: Array<any> = [];
  brands: Array<any> = [];
  lowest_amount: any;
  highest_amount: any;
  loaded: boolean = false;
  constructor(private productService: ProductService, private cdr: ChangeDetectorRef
    , private router: Router, private loader: LoaderService) { }

  ngOnInit(): void {
    this.products = this.productService.list.getValue();
    this.brands = this.productService.brand_list.getValue();
    this.highest_amount = this.productService.highest_amount.getValue();
    this.lowest_amount = this.productService.lowest_amount.getValue();
    this.brands = this.productService.brand_list.getValue();
    this.productService.getProducts(40, 1, 1).subscribe(
      (response: any) => {
        this.brands = response.options.brands;
        this.productService.brand_list.next(this.brands);
        this.productService.saveBrandListToLocals();
        console.log(response);
        this.highest_amount = parseInt(response.options.highest_amount);
        this.lowest_amount = parseInt(response.options.lowest_amount);
        this.productService.highest_amount.next(this.highest_amount);
        this.productService.lowest_amount.next(this.lowest_amount);
        this.productService.saveLowestAmountToLocals();
        this.productService.saveHighestAmountToLocals();
        this.productService.list.next(response.data);
        this.productService.saveToLocals();
        this.products = [...this.productService.list.getValue()];
        this.cdr.detectChanges();
        this.loaded = true;
      }
    )
  }
  refreshSortedProductList(evt: any) {
    this.loader.show();
    const products = this.productService.list.getValue().filter(
      product => {
        let found = (<Array<any>>evt.categories).filter((p: any) => {
          p.id == product.category.id
        });
        let pricecheck = product.price_range.lowest >= evt.minValue && product.price_range.highest <= evt.maxValue;
        let sentense = product.product_variances.filter((element: any) => (<Array<any>>evt.colors).includes(element.value));
        if(((<Array<any>>evt.brands).length > 0 && (<Array<any>>evt.brands).includes(product.brand.brand_name)) || found.length > 0 || (<Array<any>>sentense).length > 0 || pricecheck){
          return product
        }
        return null;
      }
    );
    this.products = products;
    this.loader.hide();
  }
  goToProduct(product: any) {
    this.loader.show();
    this.productService.displayingProduct.next(product);
    this.router.navigate([`product/${product.meta_name}`]).finally(
      () => {
        setTimeout(() => {
          this.loader.hide();
        }, 500);
      }
    )
  }
  goHome() {
    this.loader.show();
    this.router.navigate([`home`]).finally(
      () => {
        setTimeout(() => {
          this.loader.hide();
        }, 500);
      }
    )
  }

}
