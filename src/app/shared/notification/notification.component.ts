import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  @Input() notification:any = {
    title: 'Here is the notification title.',
    body: 'Here is the notification body',
    show: false
  };
  constructor() { }
  ngOnInit(): void {
    (<HTMLInputElement>document.getElementById('notificationId')).style.display = 'none';
  }

  static notify(title: string, message: string){
    const notificationId =  (<HTMLInputElement>document.getElementById('notificationId'));
    const notificationTitleId =  (<HTMLInputElement>document.getElementById('notificationTitleId'));
    const notificationBodyId =  (<HTMLInputElement>document.getElementById('notificationBodyId'));
    notificationTitleId.innerText = title;
    notificationBodyId.innerText = message;
    notificationId.style.display = 'block';
    setTimeout(() => {
      notificationId.style.display = 'none';
    }, 5000);
  }

}
