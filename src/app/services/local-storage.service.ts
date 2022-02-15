import { Nav, NavItem } from 'src/app/module/models/nav-item';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  static getLocalLastVisitedPage(): Nav{
    const visited = localStorage.getItem('lastVisitedPage');
    return visited ? JSON.parse(visited) : NavItem.defaultInstance();
  }
  static setLocalLastVisitedPage(nav: Nav): void{
    localStorage.setItem('lastVisitedPage', JSON.stringify(nav));
  }
  static setLocalDefaultLanguage(lang:string): void{
    localStorage.setItem('defaultLanguage', lang);
  }
  static getLocalDefaultLanguage(): string{
    const lang = localStorage.getItem('defaultLanguage');
    return lang ? lang : 'en';
  }
  static setDefaultFilterOption(value:string){
    localStorage.setItem('defaultFilter', value);
  }
  static getDefaultFilterOption(): string{
    const option = localStorage.getItem('defaultFilter');
    return option ? option : 'name';
  }
}
