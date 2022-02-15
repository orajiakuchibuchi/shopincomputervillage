export interface Nav {
  id: number;
  icon: string;
  name: string;
  route: string;
  i18next: string;
  role: Array<string>;
  submenu: Nav[];
}

export class NavItem {
  id: number;
  icon: string;
  name: string;
  route: string;
  role: Array<string>;
  i18next: string;
  submenu: Nav[];

  constructor(id:number, name: string, icon: string, i18next: string, route: string, role: Array<string>){
    this.id = id;
    this.icon = icon;
    this.name = name;
    this.role = role;
    this.i18next = i18next;
    this.route = route;

    this.submenu = [];
  }
  pushSubMenu(menu: Nav){
    this.submenu.push(menu);
  }

  static defaultInstance(){
    return {
      id: 0,
      icon: '',
      name: '',
      route: '',
      i18next: '',
      submenu: []
    }
  }

  getSubmenu(){
    return this.submenu;
  }

  hasSubMenu(name: string){
    return this.submenu.find(m => m.name.toLocaleLowerCase() === name.toLocaleLowerCase());
  }

}
