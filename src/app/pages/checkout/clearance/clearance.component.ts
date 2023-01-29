import { map, catchError } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { forkJoin, throwError } from 'rxjs';
import { UserManagementService } from 'src/app/services/user-management.service';
import { LoaderService } from 'src/app/services/loader.service';
import { AccountService } from 'src/app/services/account.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clearance',
  templateUrl: './clearance.component.html',
  styleUrls: ['./clearance.component.css']
})
export class ClearanceComponent implements OnInit {
  balance: any = 0;
  reference: any = this.randomString(15);
  errorMessage: any = '';
  cartItems: Array<any> = [];
  billingForm: FormGroup;
  paymentTypes: Array<any> = [];
  addressObserver: any = null;
  constructor(public _cart: CartService,
    public userManagement: UserManagementService,
    public authService: AuthService,
    public account: AccountService,
    public notify: NotificationService,
    public loader: LoaderService,
    public router: Router,
    private formBuilder: FormBuilder,
    private _auth: AuthService) {
    this.billingForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      country_prefix: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      sec_country_prefix: ['', []],
      sec_phone_number: ['', []],
      country_id: ['', [Validators.required]],
      state_id: ['', [Validators.required]],
      lga_id: ['', [Validators.required]],
      ward_id: ['', [Validators.required]],
      address: ['', [Validators.required]],
      addressbook: ['', []],
      transfer_type: ['direct_bank_transfer', [Validators.required]],
      additional_information: ['', []],
      agree_to_condition: [false, [Validators.required]],
    });
    this.account.getPaymentTypes().subscribe(
      (res:any)=>{
        this.resetButID(1)
      }
    );
    this.account.paymentTypeList.subscribe(l=>this.paymentTypes=l)
    this.userManagement.fetchUserAddress(this._auth.user.value.id).pipe(catchError((err: any) => {
      (<HTMLElement>document.getElementById("shouldcollapseNewAddress")).click();
      (<HTMLElement>document.getElementById("shopCartHeadingThree")).classList.add('disablehide');
      return throwError(err);
    })).subscribe((res: any) => {
      this.userManagement.address_list.next(res);
      console.log(this.userManagement.address_list.value);
    })
    this.addressObserver = forkJoin(
      [this.userManagement.fetchCountryList(), this.userManagement.fetchStatesList(),
      this.userManagement.fetchLGAList(), this.userManagement.fetchWardList(), this.userManagement.fetchBankList()])
      .subscribe(result => {
        this.userManagement.country_list.next(result[0]);
        this.userManagement.state_list.next(result[1]);
        this.userManagement.lga_list.next(result[2]);
        this.userManagement.ward_list.next(result[3]);
        this.userManagement.bank_list.next(result[4]);
      });
  }
  newAddress: any = {
    first_name: '',
    last_name: '',
    country_prefix: '',
    phone_number: '',
    sec_country_prefix: '',
    sec_phone_number: null,
    country_id: null,
    state_id: null,
    lga_id: null,
    ward_id: null,
    address: '',
    additional_information: ''
  }

  ngOnInit(): void {
    this.getbalance();
  }
  get addressbook() {
    return this.billingForm.controls.addressbook.value;
  }
  resetButID(id:any){
    let paymentTypes = this.paymentTypes.filter(it=>it.id !==id).map(
      it=>{it.selected = false; return it;}
    );
    let paymentTypes2 = this.paymentTypes.filter(it=>it.id ==id).map(
      it=>{it.selected = true; return it;}
    );
    this.paymentTypes = paymentTypes.concat(paymentTypes2);
    console.log(this.paymentTypes)
  }
  submitForm() {
    console.log(this.billingForm.controls);
    let message = ``;
    if (this.billingForm.controls.agree_to_condition.invalid) {
      message += '<span>You must agree to our terms & conditions </span>';
    }
    if (message.length > 0) {
      this.errorMessage = message;
    } else {
      this.errorMessage = '';
      this.loader.show();
      if(!this.billingForm.controls.addressbook.value){
        if (this.billingForm.controls.first_name.invalid) {
          message += '<span>Please fill in a valid first name. </span>';
        }
        if (this.billingForm.controls.last_name.invalid) {
          message += '<span>Please fill in a valid last name. </span>';
        }
        if (this.billingForm.controls.country_prefix.invalid) {
          message += '<span>Please select a valid country prefix. </span>';
        }
        if (this.billingForm.controls.phone_number.invalid) {
          message += '<span>Please fill in a valid phone number. </span>';
        }
        if (this.billingForm.controls.country_id.invalid) {
          message += '<span>Please select a country. </span>';
        }
        if (this.billingForm.controls.state_id.invalid) {
          message += '<span>Please select a state </span>';
        }
        if (this.billingForm.controls.lga_id.invalid) {
          message += '<span>Please select a LGA </span>';
        }
        if (this.billingForm.controls.ward_id.invalid) {
          message += '<span>Please select a Ward </span>';
        }
        if (this.billingForm.controls.address.invalid) {
          message += '<span>Please enter a valid address </span>';
        }
        if (message.length > 0) {
          this.errorMessage = message;
          return;
        }
        let formData = new FormData();
        formData.append('first_name', this.billingForm.controls.first_name.value);
        formData.append('last_name', this.billingForm.controls.last_name.value);
        formData.append('country_prefix', this.billingForm.controls.country_prefix.value);
        formData.append('phone_number', this.billingForm.controls.phone_number.value);
        formData.append('country_id', this.billingForm.controls.country_id.value);
        formData.append('state_id', this.billingForm.controls.state_id.value);
        formData.append('lga_id', this.billingForm.controls.lga_id.value);
        formData.append('ward_id', this.billingForm.controls.ward_id.value);
        formData.append('address', this.billingForm.controls.address.value);
        formData.append('agree_to_condition', this.billingForm.controls.agree_to_condition.value);
        this.userManagement.createAddres(formData)
          .pipe(
            catchError((err: any) => {
              console.log(err);
              this.loader.hide();
              return throwError(err);
            })
          )
          .subscribe(
            (response: any) => {
              this.loader.hide();
              console.log(response);
              this.notify.openSuccess('Address Created', 'Address successfully registered');
              setTimeout(() => {
                window.location.reload()
              }, 2000);
            }
          );
      }else{
        this.loader.hide();
        this.initatePaymentClick();
      }

    }
  }
  initatePaymentClick(){
    const hiddenclick:any = document.getElementsByClassName('hiddenclick');
    console.log(hiddenclick)
    if(hiddenclick){
      hiddenclick[0].click();
    }
  }
  paymentCancel(){
    this.reference =this.randomString(15);
  }
  paymentInit(){

  }
  paymentDone(event:any){
    console.log(event);
  //   {
  //     "reference": "SNDSNFSFSDFNFGDGGSFSSDF",
  //     "trans": "2477489062",
  //     "status": "success",
  //     "message": "Approved",
  //     "transaction": "2477489062",
  //     "trxref": "SNDSNFSFSDFNFGDGGSFSSDF",
  //     "redirecturl": "http://eventhost.ng/payment_callbacks/?trxref=SNDSNFSFSDFNFGDGGSFSSDF&reference=SNDSNFSFSDFNFGDGGSFSSDF"
  // }
  this.notify.openSuccess('Payment Completed', 'Order subitted successfully.');
  setTimeout(() => {
    this.router.navigate(['account/orders'])
  }, 1000);
  }
  randomString(length:any, chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
  getbalance() {
    return this._cart.list.pipe(
      map((carts: any) => {
        let total = 0;
        this.cartItems = carts;
        for (let i = 0; i < carts.length; i++) {
          const cart = carts[i];
          total = cart?.cart.quantity * cart?.price;
        }
        return {
          carts,
          total
        }
      })
    ).subscribe((t: any) => {
      this.balance = t.total;
    });
  }
}
