
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  list: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(this.getFromLocals());
  morelist: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(this.list.value);
  baseUrl:string = environment.getapi('store');
  maxDefaultListDisplay: number = 100;
  constructor(private http: HttpClient) {

   }
   saveToLocals(){
    sessionStorage.setItem('storeList', JSON.stringify(this.list.value));
  }
  getFromLocals(){
    let first500:any = sessionStorage.getItem('storeList');
    if(first500){
      first500 = JSON.parse(first500);
    }else{
      first500 = [];
    }
    return first500;
  }
  getStores(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/get-stores?data=less`).pipe(
      map((res:any)=>{return res;}),
       tap((res:any)=>{
        if(res.data.length > 100){
          this.list.next(res.data.slice(0,100));
          this.morelist.next(res.data.slice(100, res.data.length-1));
        }else{
          this.list.next(res.data);
          this.morelist.next([]);
        }
        this.saveToLocals();
        return res;
      })
    );
  }
}
