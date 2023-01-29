
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private readonly _status = new BehaviorSubject<String>(NetworkService.syncMonitor() ? 'ONLINE' : 'OFFLINE');
  // Exposed observable (read-only).
  readonly status$ = this._status.asObservable();
  constructor(private connectionService: ConnectionService,) {
  }
  // Get last value without subscribing to the status$ observable (synchronously).
  getStatus(): String {
    return this._status.getValue();
  }
  public get getStatusAsync() {
    return this._status;
  }
  public async _setStatus(connected: Boolean, network:Boolean = true) {
    this._status.next(connected ? 'ONLINE' : 'OFFLINE' );
    if(!network && !connected){

    }else{

    }
  }
  reloadBrowser(){
    // console.log("hello");
    window.location.reload();
  }
  // Monitor as observable
  monitor() {
    this._setStatus(NetworkService.syncMonitor(), false);
    return this.connectionService.monitor().subscribe((connected) => {
      this._setStatus(connected);
    });
  }
  static syncMonitor(){
    return navigator.onLine;
  }
}
