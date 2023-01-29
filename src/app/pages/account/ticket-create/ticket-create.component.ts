import { catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { UserManagementService } from 'src/app/services/user-management.service';
import { throwError } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent implements OnInit {
  newTicket: any = {
    desc: '',
    topic: '',
    category: 'Order'
  }
  errorMessage:string = 'Please fill in the your ticket topic and description';
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '30',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    // upload: (file: File) => { ... }
    // uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};
  constructor(private _user: UserManagementService, private notify: NotificationService) { }

  ngOnInit(): void {
  }
  create(){
    console.log(this.newTicket);
    if(this.newTicket.topic && this.newTicket.desc){
      const clickCloseTicketModal = (<HTMLElement>document.getElementById("clickCloseTicketModal"));
      if(clickCloseTicketModal){
        clickCloseTicketModal.click();
      }
      let formData = new FormData;
      formData.append('topic', this.newTicket.topic);
      formData.append('description', this.newTicket.desc);
      formData.append('category', this.newTicket.category);
      const tickets = this._user.ticket_list.value;
      tickets.unshift({
        id: null,
        ticket_code: '000000',
        category: this.newTicket.category,
        replied: 0,
        created_at: '00-00-00',
        closed: 0,
        description: this.newTicket.desc,
        topic: this.newTicket.topic,
      });
      this._user.ticket_list.next(tickets);
      this._user.createSupportTicket(formData).pipe(
        catchError((err:any)=>{
          const tickets = this._user.ticket_list.value;
          tickets.splice(0,1)
          this._user.ticket_list.next(tickets);
          let clickOpenTicketModal = (<HTMLElement>document.getElementById("clickOpenTicketModal"));
          if(clickOpenTicketModal){
            clickOpenTicketModal.click();
          }
          if(err.message){
            this.errorMessage = err.message;
          }else{
            this.errorMessage = err
          }
          console.log(err);
          this.notify.openError('Issues', err.message);
          return throwError(err);
        })
      ).subscribe(
        (response:any)=>{
          this.notify.openSuccess('Notification', response.message);
        }
      )
    }
  }

}
