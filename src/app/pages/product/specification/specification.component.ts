import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.css']
})
export class SpecificationComponent implements OnInit {
  @Input() product:any = null;
  constructor() { }

  ngOnInit(): void {
  }

}
