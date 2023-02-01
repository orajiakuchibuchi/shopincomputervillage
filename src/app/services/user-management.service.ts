
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  country_list: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  state_list: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  lga_list: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  ward_list: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  bank_list: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  address_list: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  ticket_list: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  selectedCurrency: BehaviorSubject<any> = new BehaviorSubject<any>(    {
    symbole: '₦',
    name: 'Naira'
  });
  currency_list: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([
    {
      symbole: '₦',
      name: 'Naira'
    },
    {
      symbole: '$',
      name: 'USD'
    }
  ]);
  baseUrl:string = environment.getapi('user-manage');
  constructor(private http: HttpClient) {
    this.findAndSetCurrency()
  }
  findAndSetCurrency(){
    let defaultCurrenct = sessionStorage.getItem("defaultCurrenct");
    if(defaultCurrenct){
      let currency:any = this.currency_list.value.find(c=>c.symbole == defaultCurrenct);
      if(currency){
        this.selectedCurrency.next(currency);
      }
    }
  }
   patchUser(data:any,id:any){
    return this.http.patch<any>(`${this.baseUrl}/api/users/${id}`,data);
  }
  fetchCountryList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/get-countries`).pipe(
      map((res:any)=>{return res.data;})
    );
  }
  fetchStatesList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/get-states`).pipe(
      map((res:any)=>{return res.data;})
    );
  }
  fetchLGAList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/get-lgas`).pipe(
      map((res:any)=>{return res.data;})
    );
  }
  fetchWardList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/get-wards`).pipe(
      map((res:any)=>{return res.data;})
    );
  }

  fetchBankList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/get-banks`).pipe(
      map((res:any)=>{return res.data;})
    );
  }
  fetchCurrencyList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/get-currency`).pipe(
      map((res:any)=>{return res.data;})
    );
  }
  fetchUserAddress(id:any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/get-user-addresses`).pipe(
      map((res:any)=>{return res.data;})
    );
  }
  fetchTickets(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/support-tickets`).pipe(
      map((res:any)=>{return res.data;})
    );
  }
  createSupportTicket(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/support-tickets`, data).pipe(
      map((res:any)=>{return res;})
    );
  }
  createAddres(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/user-addresses`, data).pipe(
      map((res:any)=>{return res;})
    );
  }
}
