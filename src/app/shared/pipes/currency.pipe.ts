import { _isNumberValue } from '@angular/cdk/coercion';
import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserManagementService } from 'src/app/services/user-management.service';
import { environment } from 'src/environments/environment';

@Pipe({ name: 'customCurrency' })
export class CustomCurrencyPipe implements PipeTransform {
  currencySelected:any = null;
  constructor(private userService: UserManagementService){
    this.userService.selectedCurrency.pipe(
      map(res=>{return res.symbole})
    ).subscribe(
      curr=>this.currencySelected = curr
    )
  }
  transform(value: any): any {
    if(this.currencySelected == '$'){
      return `${this.currencySelected}${(value/environment.ngusdrate).toFixed(3)}`;
    }
    return `${this.currencySelected}${value.toFixed(3)}`;
  }

}
