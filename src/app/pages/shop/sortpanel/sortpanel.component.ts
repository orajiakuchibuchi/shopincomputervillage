import { CategoryService } from 'src/app/services/category.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shop-sortpanel',
  templateUrl: './sortpanel.component.html',
  styleUrls: ['./sortpanel.component.css']
})
export class SortpanelComponent implements OnInit {
  @Input() products: Array<any> = [];
  @Input() min: any;
  @Input() max: any;
  @Input() loaded: boolean = false;
  categories:Array<any> = [];
  minValue:number = 0;
  maxValue:number = 0;
  @Input() brands:Array<any> = [];
  selectedCategory: Array<any> = [];
  selectedColor: Array<any> = [];
  selectedbrands: Array<any> = [];
  @Output() newProductSortEvent= new EventEmitter();
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    console.log(this.min);
    this.categoryService.getAllCategories().subscribe(
      (response:any)=>{
        // console.log(response);
        // this.categoryService.list.next(response.data);
        // this.brands = response.options.brands;
        this.categories = this.categoryService.list.getValue();
      }
    );
    this.categoryService.list.subscribe(value=>{this.categories = value;console.log(value)})
  }
  selectCategory(category:any){
    let index = this.selectedCategory.findIndex(x=>x.id ==category.id);
    if(index > -1){
      this.selectedCategory.splice(index,1);
    }else{
      this.selectedCategory.push(category);
    }
  }
  selectColor(color:any){
    let index = this.selectedColor.findIndex(x=>x ==color);
    if(index > -1){
      this.selectedColor.splice(index,1);
    }else{
      this.selectedColor.push(color);
    }
  }
  selectBrand(brand:any){
    let index = this.selectedbrands.findIndex(x=>x ==brand);
    if(index > -1){
      this.selectedbrands.splice(index,1);
    }else{
      this.selectedbrands.push(brand);
    }
  }
  filter(){
    let sort = {
      brands: this.selectedbrands,
      colors: this.selectedColor,
      categories: this.selectedCategory,
      minValue: this.minValue,
      maxValue: this.maxValue,
    }
    this.newProductSortEvent.emit(sort);
  }

  rangeChange($event:any){
    console.log($event);
    this.maxValue = $event.maxValue > $event.minValue ? $event.maxValue : this.minValue;
    if($event.minValue < $event.maxValue){
      this.minValue = $event.minValue;
    }else{
      this.minValue = this.max;
    }
  }
  minValChanges($event:any){
    console.log($event);

  }

}
