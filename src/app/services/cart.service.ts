import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  list: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  displayingProduct: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  baseUrl:string = environment.jsonServer;

  constructor(private http: HttpClient) {

  }
  get(token:any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/cart?access_token=${token}`).pipe(
      map((res:any)=>{return res;})
    );
  }
  find(id:any){
    return this.http.get<any>(`${this.baseUrl}/cart?_id=${id}`).pipe(
      map((res:any)=>{return res;})
    );
  }
  add(product:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/cart`, product).pipe(
      map((res:any)=>{return res;})
    );
  }
  delete(product:any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/cart/${product._id}`).pipe(
      map((res:any)=>{return res;})
    );
  }
  update(product:any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/cart/${product.id}`, product).pipe(
      map((res:any)=>{return res;})
    );
  }
  applyCoupon(data:any){
    return this.http.post<any>(`${environment.getapi('orders')}/api/apply-coupon`, data).pipe(
      map((res:any)=>{return res;})
    );
  }
  create(data:any){
    return this.http.post<any>(`${environment.getapi('orders')}/api/carts`, data).pipe(
      map((res:any)=>{return res;})
    );
  }
  get carts(){
    return this.http.get<any>(`${environment.getapi('orders')}/api/get-cart`).pipe(
      map((res:any)=>{return res;})
    );
  }
  deleteCart(id:any){
    return this.http.delete<any>(`${environment.getapi('orders')}/api/carts/${id}`).pipe(
      map((res:any)=>{return res;})
    );
  }
  updateCart(id:any, data:any){
    return this.http.post<any>(`${environment.getapi('orders')}/api/carts/${id}`, data).pipe(
      map((res:any)=>{return res;})
    );
  }

}
