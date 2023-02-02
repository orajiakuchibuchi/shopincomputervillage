import { Component, Input, OnInit } from '@angular/core';
import { SimpleModalComponent, SimpleModalService } from 'ngx-simple-modal';
import { AccountService } from 'src/app/services/account.service';
import { UserManagementService } from 'src/app/services/user-management.service';
import { WalletRecordComponent } from '../wallet-record/wallet-record.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent extends SimpleModalComponent<any, null> implements OnInit {
  @Input() canOpenmodal: boolean = true;
  @Input() fetchFromServer: boolean = true;
  @Input() wallet: any = null;
  @Input() amount: any = 0;
  constructor(private SimpleModalService: SimpleModalService, public userManagement: UserManagementService,
    private accountService: AccountService) {
    super();
    // this.userManagement.selectedCurrency.value
  }

  ngOnInit(): void {
    this.accountService.wallet.subscribe(w=>this.wallet = w);
    if(this.fetchFromServer){
      this.accountService.getWallets().subscribe();
      this.accountService.getTransactionTypes().subscribe();
    }
  }
  showContent() {
    if(this.canOpenmodal){
      this.SimpleModalService.addModal(WalletRecordComponent, {wallet: this.wallet});
    }
  }
}
