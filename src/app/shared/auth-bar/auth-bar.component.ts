import { merge, Observable } from 'rxjs';
import { NetworkService } from 'src/app/services/network.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'auth-bar',
  templateUrl: './auth-bar.component.html',
  styleUrls: ['./auth-bar.component.css']
})
export class AuthBarComponent implements OnInit {
  status: boolean = false;
  networkStatus: string = '';
  mergeRequest:Observable<any> = new Observable<any>();
  constructor(private _auth: AuthService, private network: NetworkService) { }

  ngOnInit(): void {
    this.mergeRequest = merge(this.network.getStatusAsync, this._auth.status);
    this.mergeRequest
    .subscribe(
      (value:any)=>{
        if(value=="ONLINE" || value == "OFFLINE"){
          this.networkStatus = value;
        }else{
          this.status = value;
        }
      }
    )
    this._auth.status.subscribe(
      status=>this.status = status
    )
  }

}
