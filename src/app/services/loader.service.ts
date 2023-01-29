import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private spinner: NgxSpinnerService) { }

  show(){
    this.spinner.show(); // start foreground spinner of the master loader with 'default' taskId
  }

  hide(){
    this.spinner.hide(); // stop foreground spinner of the master loader with 'default' taskId
  }
}
