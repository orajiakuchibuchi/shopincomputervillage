import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'shop-controlpanel',
  templateUrl: './controlpanel.component.html',
  styleUrls: ['./controlpanel.component.css']
})
export class ControlpanelComponent implements OnInit {
  toggle:boolean = false;
  selectedCategory: Array<any> = [];
  constructor(public categoryService: CategoryService) { }

  ngOnInit(): void {

  }
  selectCategory(category:any){
    let index = this.selectedCategory.findIndex(x=>x.id ==category.id);
    if(index > -1){
      this.selectedCategory.splice(index,1);
    }else{
      this.selectedCategory.push(category);
    }
  }

  toggleMobile(){
    const sidebarContent1 = (<HTMLLinkElement>document.getElementById("sidebarContent1"));
    this.toggle = !this.toggle;
    if(this.toggle){
      sidebarContent1.classList.remove("u-unfold--hidden");
      sidebarContent1.classList.add("fadeInLeft");
    }else{
      sidebarContent1.classList.remove("fadeInLeft");
      sidebarContent1.classList.add("u-unfold--hidden");
    }
  }

}
