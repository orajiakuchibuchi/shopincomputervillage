import { AuthService } from 'src/app/services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-header-top',
  templateUrl: './nav-header-top.component.html',
  styleUrls: ['./nav-header-top.component.css']
})
export class NavHeaderTopComponent implements OnInit {
  status: boolean = false;
  @Input() categories: Array<any> = [];
  @Input() stores: Array<any> = [];
  constructor(private _auth: AuthService, public network: NetworkService, private router: Router) { }

  ngOnInit(): void {
    this._auth.status.subscribe(
      status=>this.status = status
    )
  }
  goToPage(page:string){
    this.router.navigate([page]).finally(()=>{
      const closeMenuMobile = (<HTMLButtonElement>document.getElementById("closeMenuMobile"));
      if(closeMenuMobile){
        closeMenuMobile.click();
      }
    });
  }

}
