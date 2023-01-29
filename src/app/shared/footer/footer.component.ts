import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  products:Array<any> = [];
  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.list.subscribe(
      l=>this.products = l
    );
  }
  goToPage(page:string){
    this.router.navigate([page]).finally(()=>{
      const closeMenuMobile = (<HTMLButtonElement>document.getElementById("closeMenuMobile"));
      if(closeMenuMobile){
        closeMenuMobile.click();
      }
    });
  }
}
