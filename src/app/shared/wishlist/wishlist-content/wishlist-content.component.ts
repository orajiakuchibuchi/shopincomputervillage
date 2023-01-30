import { SimpleModalComponent } from 'ngx-simple-modal';
import { Component, OnInit, Input } from '@angular/core';
export interface ProductModal {
  product?: any;
  text?: any;
  showing?: any;
  selectedVaiance?: any;
}
@Component({
  selector: 'app-wishlist-content',
  templateUrl: './wishlist-content.component.html',
  styleUrls: ['./wishlist-content.component.css']
})
export class WishlistContentComponent extends SimpleModalComponent<ProductModal, null> implements ProductModal, OnInit {
  @Input() product:any = null;
  @Input() text:boolean = false;
  @Input() showing:boolean = false;
  @Input() selectedVaiance:any = null;
  constructor() {
    super();
  }
  ngOnInit(): void {
  }
}
