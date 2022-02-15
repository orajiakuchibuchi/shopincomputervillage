import { LocalStorageService } from './../../services/local-storage.service';
import { Nav, NavItem } from 'src/app/module/models/nav-item';
import { Component, OnInit, Input } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  @Input() public routeData:Nav;
  // Pass this as true if you need the filter button to come up
  @Input() public filter: Boolean = false;
  // pass this values of your filter items
  @Input() public filterOptions: string[] = ['name', 'price', 'date'];
  @Input() public selectedFilterOption: string = LocalStorageService.getDefaultFilterOption();
  constructor(private Router: Router) {
    // Set last visited url
    this.routeData = LocalStorageService.getLocalLastVisitedPage();
   }

  ngOnInit(): void {
    this.Router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // When ever a route change, update this variable
        // The local storage variable is updated by the left side component.
        this.routeData = LocalStorageService.getLocalLastVisitedPage();
      }
    });
  }
  getSubMenu(menu: Nav){
    const men = menu.submenu.find(m=> m.route === this.Router.url);
    return men ? men : NavItem.defaultInstance();
  }
  filterItems(item: string){
    console.log(item);
    LocalStorageService.setDefaultFilterOption(item);
    this.selectedFilterOption = item;
  }

}
