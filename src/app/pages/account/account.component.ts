import { ActivatedRoute } from '@angular/router';
import { BlockchainService } from './../../services/blockchain.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user$:any;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.user$ = this.activatedRoute.snapshot.data.user;
    console.log(this.user$);
  }

}
