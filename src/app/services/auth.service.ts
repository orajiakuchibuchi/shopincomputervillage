import { RoleService } from './role.service';
import { Role } from './../module/models/role.model';
import { IndexedDbService } from './indexed-db.service';
// import { Error, ErrorFormat, handleError } from './../module/models/ErrorFormat';
import { User } from './../module/models/user.model';
import { ResponseFormat } from './../module/models/ResponseFormat';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError, retry, map } from 'rxjs/operators';
import { CookieService } from './cookie.service';
import { Booking } from '../module/models/Booking';
import { ErrorFormat, Error } from '../module/models/ErrorFormat';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public static baseUrl: string = environment.apiUrl
  private user = new BehaviorSubject<User>(User.default());
  constructor(private http: HttpClient,
              private RoleService: RoleService) { }

  regiser(data: any): Observable< User | Error >{
    return this.http.post<ResponseFormat>(`${AuthService.baseUrl}/register`, data)
      .pipe(map((response: ResponseFormat) => {
          if(response.success && response.token){
            const user = User.default();
            user.id = response.user?.id;
            user.email = response.user?.email;
            user.token = response.token;
            user.setPassword(data.password);
            user.setToken(response.token);

            return user;
          }else{
            const error = new Error(response.error.type,
                                    response.error.priority,
                                    response.error.message,
                                    response.error.cache);
            return error;
          }
        }));
  }
  login(data: any): Observable< User | Boolean >{
    return this.http.post<ResponseFormat>(`${AuthService.baseUrl}/login`, data)
      .pipe(map((response: ResponseFormat) => {
        console.log(response);
          if(response.success && response.token){
            const user = User.default();
            user.id = response.user?.id;
            user.email = response.user?.email;
            user.token = response.token;
            user.setPassword(data.password);
            user.setToken(response.token);
            this.authenticate(user);
            this.RoleService.setRoles(response.data.role);
            return user;
          }else{
            // const error = new Error(response.error.type,
            //                         response.error.priority,
            //                         response.error.message,
            //                         response.error.cache);

            return false;
          }
        }));
  }
  searchBooking(transaction_id: any): Observable< Booking | Boolean >{
    return this.http.get<ResponseFormat>(`${AuthService.baseUrl}/search-booking/${transaction_id}`)
      .pipe(map((response: ResponseFormat) => {
          if(response.success){
            return response.data as Booking;
          }else{
            // const error = new Error(response.error.type,
            //                         response.error.priority,
            //                         response.error.message,
            //                         response.error.cache);
            return false;
          }
        }));
  }
  getDonations(start = 1, end=100): Observable< Booking[] | Boolean >{
    return this.http.get<ResponseFormat>(`${AuthService.baseUrl}/get-Donations/${start}/${end}`)
      .pipe(map((response: ResponseFormat) => {
          if(response.success){
            return response.data;
          }else{
            // const error = new Error(response.error.type,
            //                         response.error.priority,
            //                         response.error.message,
            //                         response.error.cache);
            return false;
          }
        }));
  }
  createBooking(data: any): Observable< Booking | Boolean >{
    return this.http.post<ResponseFormat>(`${AuthService.baseUrl}/create/booking`, data)
      .pipe(map((response: ResponseFormat) => {
        console.log(response);
          if(response.success){
            return response.data
          }else{
            // const error = new Error(response.error.type,
            //                         response.error.priority,
            //                         response.error.message,
            //                         response.error.cache);
            return false;
          }
        }));
  }
  updateBooking(data: any): Observable< Booking | Boolean >{
    return this.http.post<ResponseFormat>(`${AuthService.baseUrl}/update/booking`, data)
      .pipe(map((response: ResponseFormat) => {
          if(response.success){
            return response.data
          }else{
            // const error = new Error(response.error.type,
            //                         response.error.priority,
            //                         response.error.message,
            //                         response.error.cache);
            return false;
          }
        }));
  }
  confirmBooking(data: any): Observable< Booking | Boolean >{
    return this.http.post<ResponseFormat>(`${AuthService.baseUrl}/confirm/booking`, data)
      .pipe(map((response: ResponseFormat) => {
          if(response.success){
            return response.data
          }else{
            // const error = new Error(response.error.type,
            //                         response.error.priority,
            //                         response.error.message,
            //                         response.error.cache);
            return false;
          }
        }));
  }
  approveBooking(data: any): Observable< Booking | Boolean >{
    return this.http.post<ResponseFormat>(`${AuthService.baseUrl}/approve/booking`, data)
      .pipe(map((response: ResponseFormat) => {
          if(response.success){
            return response.data
          }else{
            // const error = new Error(response.error.type,
            //                         response.error.priority,
            //                         response.error.message,
            //                         response.error.cache);
            return false;
          }
        }));
  }

  async logout(data: any): Promise<Observable< Boolean >>{
    return await this.http.post<ResponseFormat>(`${AuthService.baseUrl}/logout`, data)
      .pipe(
        // catchError(handleError),
        map((response: ResponseFormat) => {
        console.log(response);
          if(response.success && response.token){
            CookieService.remove('auth.user')
            localStorage.removeItem('auth.token');
            return true;
          }else{
            return false;
          }
        }));
  }
  authenticate(user:User){
    this.user.next(user);
  }
  get status(){
    return this.user.asObservable();
  }

  getIp(){
    return this.http.get('https://jsonip.com').pipe(map((response: any) => {
      return response
    }));;
  }

  async fetchInfo(){
    const user = await this.status.toPromise();
    if(user.token){
      const updatedUser = await this.http.get<ResponseFormat>(`${AuthService.baseUrl}/auth/user/${user.token}`).toPromise();
      if(updatedUser.token){
        this.user.next(updatedUser.user || User.default());
        return this.status;
      }
    }
    return User.default();
  }
}
