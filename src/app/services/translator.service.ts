import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {

  constructor(public T: TranslateService) { }

  get(list: string[]){
    return this.T.get(list);
  }
}
