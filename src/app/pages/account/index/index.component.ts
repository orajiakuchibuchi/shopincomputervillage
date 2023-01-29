import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  page:string = 'dashboard'
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data:any)=>{
        console.log(data)
        this.page = data.page;
      }
    )
  }
  goto(page:string){
    this.router.navigate([`account/${page}`]);
  }

}
