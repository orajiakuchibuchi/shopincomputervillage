import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input() name:string = '...';
  @Input() category:string = '...';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goToshop(shop=null){
    this.router.navigate(['shop'])
  }
  goTohome(){
    this.router.navigate(['home']);
  }
}
