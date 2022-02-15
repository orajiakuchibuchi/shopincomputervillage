import { Pagination } from './../../module/models/Pagination';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent implements OnInit {

  @Input() public records: Pagination;

  constructor() {
    this.records = {
      perPage: 10,
      data: [],
      url: ''
    };
  }
  ngOnInit(): void {
  }
  previous(){

  }
  next(){

  }
}
