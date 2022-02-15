import { NotificationService } from './notification.service';
import { TranslatorService } from './translator.service';
import { FormModalComponent } from './../shared/form-modal/form-modal.component';
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
  constructor(private connectionService: ConnectionService,
              private translate: TranslatorService,
              private ntfyService: NotificationService) {
  }
  // Get last value without subscribing to the status$ observable (synchronously).
  getStatus(): String {
    return this._status.getValue();
  }
  public async _setStatus(connected: Boolean, network:Boolean = true) {
    this._status.next(connected ? 'ONLINE' : 'OFFLINE' );
    if(!network && !connected){
      FormModalComponent.prompt(
        'Network disconnected',
        undefined,
        'error',
        this.reloadBrowser,
        'Opps sorry we lost conenction. Please connect to the internet'
        );
        window.onbeforeunload = ()=>{
          return console.log("blocked")
        }
    }else{
      const translated = await this.translate.get(
        [
          'network.noNetworkMessage', 'network.noNetworkTitle', 'network.connectedNetworkMessage', 'network.connectedNetworkTitle'
        ]).toPromise();
      if(!connected){
        FormModalComponent.prompt(
                                  translated['network.noNetworkTitle'],
                                  undefined,
                                  'error',
                                  this.reloadBrowser,
                                  translated['network.noNetworkMessage']
                                  );
                                  window.onbeforeunload = ()=>{
                                    return console.log("blocked")
                                  }
      }else{
        FormModalComponent.close();
        this.ntfyService.openSuccess(translated['network.connectedNetworkTitle'],
                                    translated['network.connectedNetworkMessage'])
      }
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
