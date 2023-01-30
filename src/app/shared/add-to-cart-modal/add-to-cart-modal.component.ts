import { AddToCartModalContentComponent } from './../add-to-cart-modal-content/add-to-cart-modal-content.component';
import { Component, OnInit, Input } from '@angular/core';
import { SimpleModalComponent, SimpleModalService } from 'ngx-simple-modal';
declare const $:any;

export interface ProductModal {
  product?: any;
}
@Component({
  selector: 'app-add-to-cart-modal',
  templateUrl: './add-to-cart-modal.component.html',
  styleUrls: ['./add-to-cart-modal.component.css']
})
export class AddToCartModalComponent extends SimpleModalComponent<ProductModal, null> implements ProductModal, OnInit {
  @Input() product:any = null;
  @Input() text:boolean = false;
  @Input() selectedVaiance:any = null;
  addingToCart:any = {
    quantity: 1,
    added: false
  }

  constructor(private SimpleModalService: SimpleModalService) {
    super();
   }

  ngOnInit(): void {
  }
  showContent() {
    this.SimpleModalService.addModal(AddToCartModalContentComponent, {product: this.product, text: this.text, selectedVaiance: this.selectedVaiance});
  }

}
