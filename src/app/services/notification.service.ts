import { IndexedDbService } from './indexed-db.service';
import { ResponseFormat } from './../module/models/ResponseFormat';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Notification } from '../module/models/Notification';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public static baseUrl: string = environment.apiUrl
  public notificationList: Observable<Notification[]>;
  private _options = {
    timeout: 5000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    clickIconToClose: true
  }
  constructor(private http: HttpClient,
    private indexedDbService: IndexedDbService,
    private _service: NotificationsService) {
    this.notificationList = new Observable((observer: Observer<Notification[]>) => {});
    this.updateNotification();
  }
  // getNotifications(): Observable<Notification[]>{
  //   return this.http.get<ResponseFormat>(`${NotificationService.baseUrl}/get-notifications`)
  //                   .pipe(map((response: ResponseFormat) => {return response.data;}));
  // }
  updateNotification(){
    // this.notificationList = this.indexedDbService.loadNotifications();
    // this.notificationList.subscribe(x=>{
    //   console.log(x);
    // });
  }
  openSuccess(title:string, content: string, clickHandler?: Function ){
    const toast = this._service.success(title, content, this._options);
    setTimeout(() => {
      this._service.remove();
    }, 3000);
    toast.click?.subscribe((event)=>{
      if(clickHandler){
        clickHandler();
      }
    })
  }
}
