import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  list: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  displayingProduct: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  baseUrl:string = environment.getapi('order');

  constructor(private http: HttpClient) {

   }

  getOrders(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/orders`).pipe(
      map((res:any)=>{return res.data;})
    );
  }
  getOrder(meta_name:any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/orders/${meta_name}?data=more`).pipe(
      map((res:any)=>{return res.data;})
    );
  }
  getOrderReturns(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/orders-returns`).pipe(
      map((res:any)=>{return res.data;})
    );
  }
  getWishlist(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/get-wishlist`).pipe(
      map((res:any)=>{return res.data;})
    );
  }
  getOrderReturn(id:any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/orders-returns/${id}`).pipe(
      map((res:any)=>{return res.data;})
    );
  }
  create(data:any){
    return this.http.post<any>(`${this.baseUrl}/api/orders`, data).pipe(
      map((res:any)=>{return res.data;})
    );
  }
  createWishlist(data:any){
    return this.http.post<any>(`${this.baseUrl}/api/wishlists`, data).pipe(
      map((res:any)=>{return res.data;})
    );
  }
  deleteWishlist(id:any, data:any){
    return this.http.delete<any>(`${this.baseUrl}/api/wishlists/${id}`, data).pipe(
      map((res:any)=>{return res.data;})
    );
  }
  confirmOrder(data:any){
    return this.http.post<any>(`${this.baseUrl}/api/confirm-order`, data).pipe(
      map((res:any)=>{return res.data;})
    );
  }
  update(data:any){
    return this.http.post<any>(`${this.baseUrl}/api/update-orders`, data).pipe(
      map((res:any)=>{return res.data;})
    );
  }
}
