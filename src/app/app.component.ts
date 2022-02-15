import { LoaderComponent } from './shared/loader/loader.component';
import { User } from './module/models/User';
import { NetworkService } from './services/network.service';
import { BlockchainService } from './services/blockchain.service';
import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  title = 'DappEstate';
  status = 'ONLINE';
  isConnected = true;
    // Sets initial value to true to show loading spinner on first load
  loading = true

  constructor(private blockchainService: BlockchainService,
              private networkService: NetworkService,
              private router: Router) {
                this.router.events.subscribe((e : RouterEvent) => {
                  this.navigationInterceptor(e);
                })
  }
  ngOnInit(): void {
    // Monitor as observable
    console.log("==================");
    this.blockchainService.listenToUpdates(this.te)

    this.networkService.monitor();
  }
  te(obj:any){
    console.log("==================");
    console.log(obj)
  }
   // Shows and hides the loading spinner during RouterEvent changes
   navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true
      LoaderComponent.show();
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
      LoaderComponent.hide();
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false;
      LoaderComponent.hide();
    }
    if (event instanceof NavigationError) {
      this.loading = false;
      LoaderComponent.hide();
    }
  }
}
