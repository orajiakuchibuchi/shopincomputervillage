import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css']
})
export class GuideComponent implements OnInit {
  decribingImages: any = {
    auth: [
      'assets/images/layout/metamask.gif',
      'assets/images/layout/walletconnect.gif',
    ],
    investment: [
      'assets/images/layout/investguide.gif',
    ],
    withdrawal: [
      'assets/images/layout/withdrawal.gif',
    ],
    dashboard: [

    ],
    logout: [

    ],
  }
  constructor() { }

  ngOnInit(): void {
  }

}
