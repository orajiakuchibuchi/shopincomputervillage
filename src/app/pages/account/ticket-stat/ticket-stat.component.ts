import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-stat',
  templateUrl: './ticket-stat.component.html',
  styleUrls: ['./ticket-stat.component.css']
})
export class TicketStatComponent implements OnInit {
  @Input() ticketLength:any = 0;

  constructor() { }

  ngOnInit(): void {
  }
  openNew(){
    
  }

}
