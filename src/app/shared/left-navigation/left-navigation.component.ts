import { BlockchainService } from './../../services/blockchain.service';
import { RoleService } from './../../services/role.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { FormModalComponent } from './../form-modal/form-modal.component';
import { Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { TranslatorService } from './../../services/translator.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavItem, Nav } from 'src/app/module/models/nav-item';

@Component({
  selector: 'app-left-navigation',
  templateUrl: './left-navigation.component.html',
  styleUrls: ['./left-navigation.component.css']
})
export class LeftNavigationComponent implements OnInit, OnDestroy {
  menus: NavItem[] = [];
  list: Nav[] = [
    {
      id: 0,
      name: 'Home',
      icon: 'micon dw dw-analytics-11',
      route: '/home/dashboard',
      role: ["Store Owner"],
      i18next: 'menu.home',
      submenu: []
    },
    {
      id: 1,
      name: 'How To Use',
      icon: 'micon dw dw-help',
      route: 'guide',
      i18next: 'menu.howToUse',
      role: ["Store Owner"],
      submenu: []
    },
    {
      id: 2,
      name: 'My Account',
      icon: 'micon dw dw-user-3',
      route: 'account',
      i18next: 'menu.myAccount',
      role: ["Store Owner"],
      submenu: []
    },
    {
      id: 3,
      name: 'Investments',
      icon: 'micon dw dw-file-35',
      route: 'investment',
      i18next: 'menu.investment.title',
      role: ["Store Owner"],
      submenu: []
    },
    {
      id: 4,
      name: 'Withdrawal',
      icon: 'micon dw dw-wallet',
      route: 'withdrawal',
      i18next: 'menu.withdrawal.title',
      role: ["Store Owner"],
      submenu: []
    },
    {
      id: 5,
      name: 'Log Out',
      icon: 'micon dw dw-logout',
      route: '/auth/log-out',
      role: ["Store Owner"],
      i18next: 'menu.logout',
      submenu: []
    },
  ]
  constructor(private TranslatorService:TranslatorService,
              private Router: Router,
              private roleService: RoleService,
              private blockchainService: BlockchainService) {  }

  ngOnInit(): void {
    // Looping through each nav item
    this.list.forEach((m) => {
      // Looping through the nav.role attribute
      const menu = new NavItem(m.id, m.name,m.icon,m.i18next, m.route, m.role);
      m.submenu.forEach(sm => {
        menu.pushSubMenu(new NavItem(sm.id, sm.name,sm.icon,sm.i18next, sm.route, sm.role))
      })
      this.menus.push(menu);
      // m.role.forEach(r=>{
      //   // Check if the user has any of the roles stored in indexedDb by authservice
      //   this.roleService.hasRole(r).then(resolveable=>{
      //     // Promsie returns an observable to subscribe and return data
      //     resolveable.subscribe(role=>{
      //       if(role){
      //         const menu = new NavItem(m.id, m.name,m.icon,m.i18next, m.route, m.role);
      //         m.submenu.forEach(sm => {
      //           menu.pushSubMenu(new NavItem(sm.id, sm.name,sm.icon,sm.i18next, sm.route, sm.role))
      //         })
      //         this.menus.push(menu);
      //       }
      //     })
      //   });
      // })
    });
    this.Router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
          // Show loading indicator
          const menu = this.menus.find(m => {
            if(m.route===event.url){
              return true;
            }else{
              return m.submenu.find(sm => {
                return sm.route === event.url;
              });
            }
          });
          if(menu){
             // Set item to local storage so page-header can capture it
            LocalStorageService.setLocalLastVisitedPage(menu);
          }
      }

      if (event instanceof NavigationEnd) {
          // Hide loading indicator
      }

      if (event instanceof NavigationError) {
          // Hide loading indicator

          // Present error to user
          console.log(event.error);
      }
  });
  }
  ngOnDestroy(): void {
  }

  async translate(item: string){
    const translator = await this.TranslatorService.get([item]).toPromise();
    return translator[item];
  }

  async navAction(event:any, menu: Nav, targetId: string){
    event.preventDefault();
    const subtargetId = "submenu_"+targetId;
    targetId = "menu_"+targetId;
    if(menu.submenu.length > 0){
      const elm = (<HTMLElement>document.getElementById(targetId));
      const subm = (<HTMLElement>document.getElementById(subtargetId));
      if(elm.classList.contains('show') && subm.style.display === 'block'){
        elm.classList.remove('show');
        subm.style.display = "none";
      }else{
        elm.classList.add('show');
        subm.style.display = "block";
      }
      // elm.replaceWith(elm.cloneNode(true));
    }
    if(menu.route === "javascript:;"){
      const elm = (<HTMLLinkElement>document.getElementById(targetId));
      elm.href = menu.route;
    }else{
      // If user is in current route and click the same nav menu
      // Perform a shake action to catch user attention
      // "shakeit" is the action
      if(menu.route === this.Router.url){
        const body = document.getElementsByClassName("min-height-200px");
        if(body && body.length > 0){
          body[0].className += ' shakeit';
        }
        setTimeout(() => {
          body[0].classList.remove("shakeit");
        }, 3000);
        return this.closeNav();
      }
      if(menu.route === '/' || menu.route == '/dashboard'){
        this.Router.navigate(['/']).finally(()=>{
          // window.location.reload();
        });
        return false;
      }
      this.Router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.Router.onSameUrlNavigation = 'reload';
      this.Router.navigate([menu.route]).catch(async error => {
        const translator = await this.TranslatorService.get(['route.errorTitle', 'btnClose', 'route.notFoundMessage']).toPromise();
        FormModalComponent.prompt(translator['route.errorTitle'], 'dashboard', 'error', translator['btnClose'], `${translator['route.notFoundMessage']} \nRoute: ${menu.route}`);
        FormModalComponent.close(10000);
        setTimeout(()=>{
          window.location.reload();
        }, 5000);
      }).finally(()=>{
          window.scrollTo(0,0);
      });
    }
  }
  closeNav(){
    // document.getElementById("closenavId")?.click();
    const leftBat = (<HTMLInputElement>document.getElementById("left-bar"));
    leftBat.classList.remove('open');
    // console.log("clicked")
  }

}
