import { SimpleModalService } from 'ngx-simple-modal';
import { Component, Input, OnInit } from '@angular/core';
import { CompareContentComponent } from './compare-content/compare-content.component';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  @Input() product:any = null;
  constructor(private SimpleModalService: SimpleModalService) { }

  ngOnInit(): void {
  }
  showContent() {
    this.SimpleModalService.addModal(CompareContentComponent, {product: this.product});
  }
  hideModal(){
    setTimeout(() => {
      let backdrop = document.getElementsByClassName('modal-backdrop');
      if(backdrop && backdrop.length > 0){
        backdrop.item(0)?.remove();
      }
    }, 1500);
  }
}
