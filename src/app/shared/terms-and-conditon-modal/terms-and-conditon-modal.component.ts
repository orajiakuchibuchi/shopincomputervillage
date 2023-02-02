import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

@Component({
  selector: 'app-terms-and-conditon-modal',
  templateUrl: './terms-and-conditon-modal.component.html',
  styleUrls: ['./terms-and-conditon-modal.component.css']
})
export class TermsAndConditonModalComponent extends SimpleModalComponent<any, null> implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
