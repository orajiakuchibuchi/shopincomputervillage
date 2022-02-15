import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-search',
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.css']
})
export class NavSearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  openNav() {
    const leftBat = (<HTMLInputElement>document.getElementById("left-bar"));
    if (leftBat.classList.contains("open")) {
        leftBat.classList.remove('open');
    } else {
        leftBat.classList.add('open');
    }
  }
}
