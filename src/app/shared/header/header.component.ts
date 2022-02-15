import { BlockchainService } from './../../services/blockchain.service';
import { CookieService } from './../../services/cookie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any = null;
  constructor(private CookieService:CookieService, private blockchainService: BlockchainService) { }

  ngOnInit(): void {
    this.user = this.blockchainService.getuser();
    // if (this.user) {
    //   this.user = JSON.parse(this.user).email;
    // }
  }

}
