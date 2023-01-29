import { distinctUntilChanged, debounceTime, concatMap } from 'rxjs/operators';
import { FormBuilder,FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { CookieService } from 'src/app/services/cookie.service';
import { ProductService } from 'src/app/services/product.service';
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'nav-header-bottom-center',
  templateUrl: './nav-header-bottom-center.component.html',
  styleUrls: ['./nav-header-bottom-center.component.css']
})
export class NavHeaderBottomCenterComponent implements OnInit {
  @Input() categories: Array<any> = [];
  @Input() stores: Array<any> = [];
  searchForm: FormGroup;
  constructor(private formbuilder:FormBuilder,
    private cookieService: CookieService,
    public categoryService: CategoryService,
    private productService: ProductService,
    private crf: ChangeDetectorRef) {
    this.searchForm = this.formbuilder.group({
      name: [''],
      category: ['']
    });
    this.searchForm.valueChanges.pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      concatMap((query:any)=>{
        // pagination[perPage]
        // pagination[page]
        let formData = new FormData();
        formData.append('pagination[page]', '1');
        formData.append('pagination[perPage]', '40');
        formData.append('name', query.name);
        formData.append('category', query.category);
        return this.productService.searchProduct(query, formData);
      })
    )
    .subscribe(
       saveResult =>  {
        console.log(saveResult)
       },
        err => {
          console.log(err);
        }
    );
   }

  ngOnInit(): void {
    this.categoryService.list.subscribe(
      (categories:any)=>{
        this.categories = [...categories];
        this.crf.detectChanges();
      }
    )
  }
  submitSearch(){
    let response:any = localStorage.getItem("authToken");
    console.log(this.searchForm.controls);
    this.cookieService.setCookie("authToken", response);

  }
}
