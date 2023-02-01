
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  list: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  paymentTypeList: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  wallet: BehaviorSubject<any> = new BehaviorSubject<any>({
    amount: 0,
    created_at: null,
    id: null
  });
  displayingProduct: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  baseUrl:string = environment.getapi('account');

  constructor(private http: HttpClient) {

   }

  getWallets(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/get-wallet`).pipe(
      map(res=> {return res.data}),
      tap((res:any)=>{
       console.log(res);
       if(res){
        this.wallet.next(
          {
            id: res.id,
            created_at: res.created_at,
            amount: parseInt(res.amount)
          }
         )
       }
        return res;})
    );
  }

  getPaymentTypes(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/get-payment-types`).pipe(
      map(res=> {return res.data}),
      tap((res:any)=>{
        this.paymentTypeList.next(res)
        return res;})
    );
  }
  getOrder(meta_name:any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/payment/${meta_name}?data=more`).pipe(
      map((res:any)=>{return res.data;})
    );
  }
  getOrderReturns(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/payment-returns`).pipe(
      map((res:any)=>{return res.data;})
    );
  }
  getWishlist(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/get-wishlist`).pipe(
      map((res:any)=>{return res.data;})
    );
  }
  getOrderReturn(id:any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/payment-returns/${id}`).pipe(
      map((res:any)=>{return res.data;})
    );
  }
  create(data:any){
    return this.http.post<any>(`${this.baseUrl}/api/payment`, data).pipe(
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
    return this.http.post<any>(`${this.baseUrl}/api/update-payment`, data).pipe(
      map((res:any)=>{return res.data;})
    );
  }
}
