import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
declare const $:any;
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private loader: LoaderService) { }

  ngOnInit(): void {
  }
  hideModal(){
    setTimeout(() => {
      let backdrop = document.getElementsByClassName('modal-backdrop');
      if(backdrop && backdrop.length > 0){
        backdrop.item(0)?.remove();
      }
    }, 1500);
  }

}
