import { LocalStorageService } from './../../services/local-storage.service';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

interface AppState {
  lang: string;
}
@Component({
  selector: 'app-select-language',
  template: `
    <div class="col-sm-12 col-md-12">
      <select class="custom-select col-12" #langSelect (change)="translate.use(langSelect.value);updateLanguageLocals(langSelect.value)">
        <option *ngFor="let lang of translate.getLangs()"
        [value]="lang"
        [attr.selected]="lang === translate.currentLang ? '' : null"
      >{{lang}}</option>
      </select>
    </div>
  `,
})

export class SelectLanguageComponent {
  language$: Observable<string>;
  constructor(public translate: TranslateService, private store: Store<AppState>) {
    this.language$ = this.store.select('lang');
  }

  updateLanguageLocals(value: string){
    // console.log(value);
    // TODO LOG LANGUAGE CHANGE EVENT TO IMPROVE AI UNDERSTANDING
    this.store.dispatch({type: value.toUpperCase()})
    LocalStorageService.setLocalDefaultLanguage(value);
  }
}
