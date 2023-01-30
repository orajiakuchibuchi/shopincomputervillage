import { SimpleModalComponent } from 'ngx-simple-modal';
import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
export interface ProductModal {
  product?: any;
  text?: any;
  showing?: any;
  selectedVaiance?: any;
}
@Component({
  selector: 'app-compare-content',
  templateUrl: './compare-content.component.html',
  styleUrls: ['./compare-content.component.css']
})
export class CompareContentComponent extends SimpleModalComponent<ProductModal, null> implements ProductModal, OnInit {
  @Input() product:any = null;
  @Input() text:boolean = false;
  @Input() showing:boolean = false;
  @Input() selectedVaiance:any = null;
  constructor(public productService: ProductService) {
    super();
  }

  ngOnInit(): void {
    console.log(this.product);
  }

}
