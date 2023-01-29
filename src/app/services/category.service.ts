import { CookieService } from './cookie.service';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  list: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(this.getFromLocals());
  morelist: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(this.list.value);
  brandlist: Array<any> = [];
  maxDefaultListDisplay: number = 20;
  baseUrl:string = environment.getapi('category');
  
  constructor(private http: HttpClient, private cookieService: CookieService) {

  }

  saveToLocals(){
    sessionStorage.setItem('categoryList', JSON.stringify(this.list.value));
  }
  getFromLocals(){
    let first500:any = sessionStorage.getItem('categoryList');
    if(first500){
      first500 = JSON.parse(first500);
    }else{
      first500 = [];
    }
    return first500;
  }

  getAllCategories(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/get-categories?data=less`).pipe(
      map((res:any)=>{
        return res;}
      ),
      tap((res:any)=>{
        if(res.data.length > this.maxDefaultListDisplay){
          this.list.next(res.data.slice(0,this.maxDefaultListDisplay));
          this.morelist.next(res.data.slice(this.maxDefaultListDisplay, res.data.length-1));
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
