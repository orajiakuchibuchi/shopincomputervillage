import { NotificationService } from './../../../services/notification.service';
import { IndexedDbService } from './../../../services/indexed-db.service';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Notification } from 'src/app/module/models/Notification';
import * as _ from 'underscore';
import { Error } from 'src/app/module/models/ErrorFormat';

@Component({
  selector: 'app-nav-notification',
  templateUrl: './nav-notification.component.html',
  styleUrls: ['./nav-notification.component.css']
})
export class NavNotificationComponent implements OnInit, OnDestroy {
  public notificationList: Observable<Notification[]> = this.NotificationService.notificationList;
  public static nList : Notification[]= [];
  private seen: boolean = false;
  private clientErrorList: Error[] = [];
  private interval:any = null;
  constructor(private indexedDbService: IndexedDbService,
              private NotificationService: NotificationService,
              private cdRef: ChangeDetectorRef) {

   }

  ngOnInit(): void {
    this.interval = setInterval(() => {
      // Migrating client error from session storage
      let clientError:any = sessionStorage.getItem(IndexedDbService.CLIENT_ERROR);
      if(clientError){
        try {
          clientError = JSON.parse(clientError);
          clientError.forEach((element: Error, index:any, array:any) => {
            let form = new FormData();
            form.append('type', element.type);
            form.append('priority', element.priority.toString());
            form.append('message', element.message);
            form.append('created_at', JSON.stringify(Date.now()));
            form.append('updated_at', JSON.stringify(Date.now()));
            form.append('cache', JSON.stringify(element.cache));
            this.indexedDbService.addToDb(IndexedDbService.CLIENT_ERROR, form).subscribe(x=>{
              clientError.splice(index,1);
            });
          });
          sessionStorage.removeItem(IndexedDbService.CLIENT_ERROR);
        } catch (error) {
          sessionStorage.removeItem(IndexedDbService.CLIENT_ERROR);
        }
      }
      // Notification update
      // this.NotificationService.updateNotification();
      const oldLength = NavNotificationComponent.nList.length;

      this.notificationList.subscribe(x=>{
        NavNotificationComponent.nList = _.sortBy(x, 'created_at').reverse();
        if(NavNotificationComponent.nList.length > oldLength){
          (<HTMLInputElement>document.getElementById("no-notif")).style.display = 'block';
        }else{
          (<HTMLInputElement>document.getElementById("no-notif")).style.display = 'none';
        }
      })
      this.cdRef.detectChanges();
    }, 10000);
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
  getStaticnList() {
    return NavNotificationComponent.nList;
  }
  viewNotification(){
    if(this.seen && NavNotificationComponent.nList.length>0){
      this.seen = true;
      (<HTMLInputElement>document.getElementById("no-notif")).style.display = 'none';
    }
  }
}
