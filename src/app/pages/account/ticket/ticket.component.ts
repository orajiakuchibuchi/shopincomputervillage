import { Component, OnInit } from '@angular/core';
import { UserManagementService } from 'src/app/services/user-management.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  constructor(public _user: UserManagementService) { }

  ngOnInit(): void {
    this._user.fetchTickets().subscribe(
      (response)=>{
        this._user.ticket_list.next(response);
      }
    );
  }

}
