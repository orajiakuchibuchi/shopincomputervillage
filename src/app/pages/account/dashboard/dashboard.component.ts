import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  photo: any = '/assets/img/22-del-kitchengadgets-1668630414.gif';
  cart: any = '/assets/img/cart.gif';
  interval: any = null;
  public cardList = [
    { title: 'Shop Now', cols: 2, rows: 1 , color: 'Tomato' },
    { title: 'Card 2', cols: 1, rows: 1 , color: 'Orange' },
    { title: 'Card 3', cols: 1, rows: 2 , color: 'DodgerBlue' },
    { title: 'Card 4', cols: 1, rows: 1 , color: 'MediumSeaGreen' },
    { title: 'Card 5', cols: 1, rows: 1 , color: 'Gray' },
    { title: 'Card 6', cols: 2, rows: 1 , color: 'SlateBlue' },
    { title: 'Card 7', cols: 1, rows: 1 , color: 'Violet' },
    { title: 'Card 8', cols: 1, rows: 1 , color: 'LightGray' },
    { title: 'Card 9', cols: 1, rows: 2 , color: 'PINK' },
    { title: 'Card 10', cols: 2, rows: 1 , color: 'GREENYELLOW' },
    { title: 'Card 11', cols: 1, rows: 1 , color: 'DARKTURQUOISE' },
    { title: 'Card 12', cols: 2, rows: 1 , color: 'BURLYWOOD' },
    { title: 'Card 13', cols: 2, rows: 2 , color: 'GOLD' },
    { title: 'Card 14', cols: 1, rows: 1 , color: 'LIGHTSTEELBLUE' },
    { title: 'Card 15', cols: 1, rows: 1 , color: 'SALMON' },
    ];
    currentIndex:number = 0;
    drop(event: CdkDragDrop<string[]> | any) {
      moveItemInArray(this.cardList, event.previousIndex, event.currentIndex);
    }
  constructor(public _auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  shopPage(){
    this.router.navigate(['shop'])

  }

}
