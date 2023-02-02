import { catchError } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserManagementService } from 'src/app/services/user-management.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-wallet-record',
  templateUrl: './wallet-record.component.html',
  styleUrls: ['./wallet-record.component.css']
})
export class WalletRecordComponent extends SimpleModalComponent<any, null> implements OnInit {
  amount: any = 1000;
  paymentType:any = [];
  selectedPaymentType:any = null;
  @Input() wallet:any = null;
  @Input() transactionTypes:any = [];
  reference: any = this.randomString(15);

  constructor(private accountService: AccountService,
    private userManagement: UserManagementService,
    private notify: NotificationService,
    public loader: LoaderService, public authService: AuthService) {
    super();
  }
  randomString(length:any, chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  initatePaymentClick(){
    this.loader.show()
  }
  paymentCancel(){
    this.reference =this.randomString(15);
  }
  createWallet(){
    let formData = new FormData();
    this.loader.show()
    formData.append('amount', '0');
    this.accountService.createWallet(formData).pipe(catchError((e:any)=>{
      this.loader.hide();
      console.log(e)
      this.notify.openError('Opps', 'Opps something went wrong. Please contact the developer to fix server error response')
      super.close();
      return throwError(e);
    })).subscribe(
      res=> {
        this.loader.hide();
        console.log(res)
      }
    )
  }
  paymentInit(){
    this.loader.hide()
  }
  paymentDone(event:any){
    console.log(event);
    this.loader.show()
    let formData = new FormData();
    let trnstype = this.transactionTypes.find((t:any)=>{return t.name.includes("Credit (Wallet)")})
    formData.append('transaction_type_id', trnstype.id)
    formData.append('payment_type_id', this.selectedPaymentType)
    formData.append('amount', this.amount)
    formData.append('user_id', this.authService.user.value.id)
    formData.append('currency', this.userManagement.selectedCurrency.value.name)
    formData.append('currency_name', this.userManagement.selectedCurrency.value.name)
    formData.append('currency_field', this.userManagement.selectedCurrency.value.name)
    formData.append('currency_symbol', this.userManagement.selectedCurrency.value.symbole)
    formData.append('service', 'Account')
    formData.append('service_details', 'Please credit my wallet with the sum of ' + this.amount)
    this.accountService.createTransaction(formData).pipe(catchError((e:any)=>{
      this.loader.hide();
      console.log(e)
      this.notify.openError('Opps', 'Opps something went wrong. Please contact the developer to fix server error response')
      super.close();
      return throwError(e);
    })).subscribe(
      r=>{
        console.log(r);
        this.notify.openSuccess(r.transaction_type_name, `Payment ${r.status} and processing please wait!`);
        let amt = this.accountService.wallet.value;
        amt.amount += this.amount;
        this.accountService.wallet.next(amt);
        this.loader.hide();
        formData.append('amount', this.amount);
        formData.append('transaction_code', r.reference_code);
        formData.append('type', 'credit');
        this.loader.show();
        this.accountService.updateWallet(formData).pipe(catchError((e:any)=>{
          this.loader.hide();
          console.log(e)
          this.notify.openError('Opps', 'Opps something went wrong. Please contact the developer to fix server error response')
          super.close();
          return throwError(e);
        })).subscribe(
          u=>{
            console.log(u);
            this.loader.hide();
            this.notify.openSuccess(r.transaction_type_name, 'Hello your transaction was successfully completed. Wallet credited');
            super.close();
          }
        )
      //   {
      //     "user_id": "2",
      //     "transaction_type_id": 2,
      //     "transaction_type_name": "Credit (Wallet)",
      //     "payment_type_id": 1,
      //     "payment_type_name": "Paystack",
      //     "reference_code": "9f0d82b6-0948-42f4-ba25-f2868296946e",
      //     "description": null,
      //     "currency": "Naira",
      //     "currency_symbol": "₦",
      //     "amount": "1000",
      //     "service": "Account",
      //     "service_details": "Please credit my wallet with the sum of 1000",
      //     "status": "pending",
      //     "updated_at": "2023-02-01T22:43:39.000000Z",
      //     "created_at": "2023-02-01T22:43:39.000000Z",
      //     "id": 371
      // }
      }
    )
  //   {
  //     "reference": "SNDSNFSFSDFNFGDGGSFSSDF",
  //     "trans": "2477489062",
  //     "status": "success",
  //     "message": "Approved",
  //     "transaction": "2477489062",
  //     "trxref": "SNDSNFSFSDFNFGDGGSFSSDF",
  //     "redirecturl": "http://eventhost.ng/payment_callbacks/?trxref=SNDSNFSFSDFNFGDGGSFSSDF&reference=SNDSNFSFSDFNFGDGGSFSSDF"
  // }
  }
  ngOnInit(): void {
    this.accountService.paymentTypeList.subscribe(res=>{
      this.paymentType =res.filter(r=>{
        console.log(r)
        return !(r.name.includes('LasPay') || r.name.includes('Cash'));

      })
    });
    this.accountService.wallet.subscribe(w=>this.wallet = w);
    this.accountService.TransactionTypeList.subscribe(t=>this.transactionTypes =t);
    this.accountService.getPaymentTypes().subscribe();
  }

}
