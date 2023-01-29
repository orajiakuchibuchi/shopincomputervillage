import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'product-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesComponent implements OnInit {
  @Input() product:any = null;
  suggestions:Array<any> = [];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.list.subscribe(
      (prod:Array<any>)=>{
        this.suggestions = prod.filter(p=>p.id != this.product.id);
      }
    )
  }

}
