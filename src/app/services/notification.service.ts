import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public static baseUrl: string = environment.apiUrl
  public notificationList: Observable<Notification[]>;
  public queueList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private _options = {
    timeout: 15000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    clickIconToClose: true,
    position: ["bottom", "left"],
  }
  constructor(private http: HttpClient,
    private _service: NotificationsService) {
    this.notificationList = new Observable((observer: Observer<Notification[]>) => {});
  }

  openSuccess(title:string, content: string, clickHandler?: Function ){
    const toast = this._service.success(title, content, this._options);
    console.log(toast)
    // setTimeout(() => {
    //   this._service.remove();
    // }, 3000);
    toast.click?.subscribe((event)=>{
      if(clickHandler){
        clickHandler();
      }
    })
  }
  openAlert(title:string, content: string, clickHandler?: Function ){
    const toast = this._service.alert(title, content, this._options);
    console.log(toast)
    // setTimeout(() => {
    //   this._service.remove();
    // }, 3000);
    toast.click?.subscribe((event)=>{
      if(clickHandler){
        clickHandler();
      }
    })
  }
  openWarning(title:string, content: string, clickHandler?: Function ){
    const toast = this._service.warn(title, content, this._options);
    console.log(toast)
    setTimeout(() => {
      this._service.remove();
    }, 3000);
    toast.click?.subscribe((event)=>{
      if(clickHandler){
        clickHandler();
      }
    })
  }
  openInfo(title:string, content: string, clickHandler?: Function ){
    const toast = this._service.info(title, content, this._options);
    console.log(toast)
    // setTimeout(() => {
    //   this._service.remove();
    // }, 3000);
    toast.click?.subscribe((event)=>{
      if(clickHandler){
        clickHandler();
      }
    })
  }
  openError(title:string, content: string, clickHandler?: Function ){
    const toast = this._service.error(title, content, this._options);
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
