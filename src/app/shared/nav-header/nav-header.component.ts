import { CategoryService } from 'src/app/services/category.service';
import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit {
  @Input() categories: Array<any> = [];
  @Input() stores: Array<any> = [];
  constructor(private categorySerive: CategoryService, private storeService: StoreService) { }

  ngOnInit(): void {
    this.initiateCateory();
    this.storeService.list.subscribe(
      (list:Array<any>)=>{
        this.stores = list;
      }
    )
  }
  initiateCateory(){
    console.log(this.categorySerive.getFromLocals());
    this.categories = this.categorySerive.list.getValue();
    this.pairCategoryToChildren();
    this.categorySerive.getAllCategories().subscribe(
      (categories:any)=>{
        this.categories = this.categorySerive.list.getValue();
        this.pairCategoryToChildren();
      }
    )
  }
  pairCategoryToChildren(){
    this.categories.map(
      (category:any)=>{
        category.children = this.categories.filter(
          (cat:any)=>{
            return cat.parent_id == category.id;
          }
        )
      }
    );
  }
}
