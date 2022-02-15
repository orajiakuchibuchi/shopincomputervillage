import { CarlendarEvent } from './../../module/models/CarlendarEvent';
import { Component, OnInit } from '@angular/core';
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
    let events: CarlendarEvent[] = [
			  {
          title: 'Barber',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu pellentesque nibh. In nisl nulla, convallis ac nulla eget, pellentesque pellentesque magna.',
          start: '2021-12-03',
          end: '2021-12-05',
          className: 'fc-bg-default',
          icon : "circle",
          type: "user",
          allDay: false
			  }
			];
    jQuery('#calendar').fullCalendar({
			themeSystem: 'bootstrap4',
			// emphasizes business hours
			businessHours: false,
			defaultView: 'month',
			// event dragging & resizing
			editable: true,
			// header
			header: {
				left: 'title',
				center: 'month,agendaWeek,agendaDay',
				right: 'today prev,next'
			},
			events:  events,
			dayClick: function() {
				jQuery('#modal-view-event-add').modal();
			},
			eventClick: function(event:any, jsEvent:any, view:any) {
				jQuery('.event-icon').html("<i class='fa fa-"+event.icon+"'></i>");
				jQuery('.event-title').html(event.title);
				jQuery('.event-body').html(event.description);
				jQuery('.eventUrl').attr('href',event.url);
				jQuery('#modal-view-event').modal();
			},
		})
  }

  addEvent(){
    let values:any = {};
    $.each($('#add-event').serializeArray(), function(i:any, field:any) {
			values[field.name] = field.value;
		});
  }
}
