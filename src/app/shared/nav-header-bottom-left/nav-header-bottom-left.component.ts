import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'nav-header-bottom-left',
  templateUrl: './nav-header-bottom-left.component.html',
  styleUrls: ['./nav-header-bottom-left.component.css']
})
export class NavHeaderBottomLeftComponent implements OnInit {
  @Input() categories: Array<any> = [];
  @Input() stores: Array<any> = [];
  constructor(private categorySerive: CategoryService, private router: Router) { }

  ngOnInit(): void {
  }
  goToShop(shop:any){
    this.router.navigate(['shop'])
  }

}
