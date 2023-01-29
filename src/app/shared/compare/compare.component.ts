import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

  constructor() { }

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
