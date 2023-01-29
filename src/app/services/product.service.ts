import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  list: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(this.getFromLocals());
  displayingProduct: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  baseUrl:string = environment.getapi('product');
  maxDefaultListDisplay: number = 100;
  morelist: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(this.list.value);

  constructor(private http: HttpClient) {
  }
  saveToLocals(){
    sessionStorage.setItem('productList', JSON.stringify(this.list.value));
  }
  getFromLocals(){
    let first500:any = sessionStorage.getItem('productList');
    if(first500){
      first500 = JSON.parse(first500);
    }else{
      first500 = [];
    }
    return first500;
  }

  getProducts(perpage:any, page:any, sampleprodct:any): Observable<any> {
    let formData = new FormData();
    formData.append('pagination[perpage]', perpage);
    formData.append('pagination[page]', page);
    formData.append('view', 'moreData');
    // formData.append('query[sample_product]', sampleprodct);
    return this.http.get<any>(`${this.baseUrl}/api/products?pagination[perpage]=40&pagination[page]=1&view=moreData`).pipe(
      map((res:any)=>{return res;}),
      tap((res:any)=>{
        console.log(res)
        if(res.data.length > 100){
          this.list.next(res.data.slice(0,100));
          this.morelist.next(res.data.slice(this.list.value.length, res.data.length-1));
        }else{
          this.list.next(res.data);
          this.morelist.next([]);
        }
        this.saveToLocals();
        return res;
      })
    );
  }
  getProduct(meta_name:any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/products/${meta_name}?view=moreData`).pipe(
      map((res:any)=>{return res.data;})
    );
  }
  searchProduct(query:any, formdata:any){
    return this.http.post<any>(`${this.baseUrl}/api/search-products/${query.name}`, formdata).pipe(
      map((res:any)=>{return res.data;})
    );
  }
  getProductsWithDiscount(){
    return this.http.get<any>(`${this.baseUrl}/api/products-discounts`).pipe(
      map((res:any)=>{return res.data;})
    );
  }
  getProductVariances(){
    return this.http.get<any>(`${this.baseUrl}/api/product-variances`).pipe(
      map((res:any)=>{return res.data;})
    );
  }
  showProductWithDiscount(id:any){
    return this.http.get<any>(`${this.baseUrl}/api/products-discounts/${id}`).pipe(
      map((res:any)=>{return res.data;})
    );
  }
  showProductVariance(id:any){
    return this.http.get<any>(`${this.baseUrl}/api/product-variances/${id}`).pipe(
      map((res:any)=>{return res.data;})
    );
  }
  getRecentlyViewed(){
    return this.http.get<any>(`${this.baseUrl}/api/recently-viewed-products`).pipe(
      map((res:any)=>{return res.data;})
    );
  }
  getBrands(){
    return this.http.get<any>(`${this.baseUrl}/api/brands/all`).pipe(
      map((res:any)=>{return res.data;})
    );
  }
  createRecentlyViewed(data:any){
    return this.http.post<any>(`${this.baseUrl}/api/recently-viewed-products`,data).pipe(
      map((res:any)=>{return res.data;})
    );
  }

}
