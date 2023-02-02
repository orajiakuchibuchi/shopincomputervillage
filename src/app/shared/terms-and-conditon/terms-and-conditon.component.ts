import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent, SimpleModalService } from 'ngx-simple-modal';
import { TermsAndConditonModalComponent } from '../terms-and-conditon-modal/terms-and-conditon-modal.component';

@Component({
  selector: 'app-terms-and-conditon',
  templateUrl: './terms-and-conditon.component.html',
  styleUrls: ['./terms-and-conditon.component.css']
})
export class TermsAndConditonComponent extends SimpleModalComponent<any, null> implements OnInit {

  constructor(private SimpleModalService: SimpleModalService) {
    super();
   }
  ngOnInit(): void {
  }
  showContent() {
    this.SimpleModalService.addModal(TermsAndConditonModalComponent);
  }

}
