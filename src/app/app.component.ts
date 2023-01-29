import { NetworkService } from './services/network.service';

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'LAS LAS';
  status = 'ONLINE';
  isConnected = true;
    // Sets initial value to true to show loading spinner on first load
  loading = true

  constructor(
    private networkService: NetworkService,
              private router: Router) {
                this.router.events.subscribe((e : RouterEvent) => {
                  // this.navigationInterceptor(e);
                })
  }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.networkService.monitor();
  }
  te(obj:any){
    console.log("==================");
    console.log(obj)
  }


}
