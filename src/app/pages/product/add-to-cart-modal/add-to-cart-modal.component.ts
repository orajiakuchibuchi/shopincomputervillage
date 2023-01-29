import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-to-cart-modal',
  templateUrl: './add-to-cart-modal.component.html',
  styleUrls: ['./add-to-cart-modal.component.css']
})
export class AddToCartModalComponent implements OnInit {
  @Input() product:any = null;
  addingToCart:any = {
    quantity: 1,
    added: false
  }

  constructor() { }

  ngOnInit(): void {
    setInterval(()=>{
      console.log(this.product);
    },3000)
  }
  save(){

  }
  decrease(){
    this.addingToCart.quantity > 1 ? this.addingToCart.quantity-- : this.addingToCart.quantity=1;
  }
  increase(){
    this.addingToCart.quantity++;
  }

}
