import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-wallet-record',
  templateUrl: './wallet-record.component.html',
  styleUrls: ['./wallet-record.component.css']
})
export class WalletRecordComponent extends SimpleModalComponent<any, null> implements OnInit {
  amount: any = 1000;
  tranactionType:any = [];
  selectedTransactionType:any = null;
  reference: any = this.randomString(15);

  constructor(private accountService: AccountService, public loader: LoaderService, public authService: AuthService) {
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
  paymentInit(){

    this.loader.hide()
  }
  paymentDone(event:any){
    console.log(event);
    this.loader.hide()
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
      this.tranactionType =res.filter(r=>{
        console.log(r)
        return !(r.name.includes('LasPay') || r.name.includes('Cash'));

      })
    });
    this.accountService.getPaymentTypes().subscribe();
  }

}
