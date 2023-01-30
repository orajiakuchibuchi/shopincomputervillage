import { SimpleModalService } from 'ngx-simple-modal';
import { Component, OnInit, Input } from '@angular/core';
import { WishlistContentComponent } from './wishlist-content/wishlist-content.component';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  @Input() product:any = null;
  constructor(private SimpleModalService: SimpleModalService) { }

  ngOnInit(): void {
  }
  showContent() {
    this.SimpleModalService.addModal(WishlistContentComponent, {product: this.product});
  }

}
