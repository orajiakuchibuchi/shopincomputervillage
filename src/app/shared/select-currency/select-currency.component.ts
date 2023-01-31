import { Component, Input, OnInit } from '@angular/core';
import { UserManagementService } from 'src/app/services/user-management.service';

@Component({
  selector: 'app-select-currency',
  templateUrl: './select-currency.component.html',
  styleUrls: ['./select-currency.component.css']
})
export class SelectCurrencyComponent implements OnInit {
  @Input() styleClass: any = '';
  currency:any = null;
  constructor(public userService: UserManagementService) { }

  ngOnInit(): void {
    this.userService.selectedCurrency.subscribe(
      res=>{
        console.log(res);
        this.currency = res;
      }
    )
    // this.userService.fetchCurrencyList().subscribe(
    //   res=>{
    //     console.log(res)
    //   }
    // )
  }
  updateCurency(evt:any){
    console.log(evt.target.value);
    let value = evt.target.value;
    if(value){
      sessionStorage.setItem("defaultCurrenct", value);
      window.location.reload();
    }
    this.userService.findAndSetCurrency();
  }

}
