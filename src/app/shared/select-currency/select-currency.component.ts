import { Component, Input, OnInit } from '@angular/core';
import { UserManagementService } from 'src/app/services/user-management.service';

@Component({
  selector: 'app-select-currency',
  templateUrl: './select-currency.component.html',
  styleUrls: ['./select-currency.component.css']
})
export class SelectCurrencyComponent implements OnInit {
  @Input() styleClass: any = '';
  currency:any = 'Naira';
  constructor(private userService: UserManagementService) { }

  ngOnInit(): void {
    // this.userService.fetchCurrencyList().subscribe(
    //   res=>{
    //     console.log(res)
    //   }
    // )
  }

}
