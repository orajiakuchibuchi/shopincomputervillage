import { Injectable } from '@angular/core';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
@Injectable({
  providedIn: 'root'
})
export class ExporterService {
  private _options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: '',
    useBom: true,
    noDownload: false,
    headers: <Array<string>>[],
    useHeader: false,
    nullToEmptyString: true,
  };
  public get options() {
    return this._options;
  }
  public set options(value) {
    this._options = value;
  }
  constructor() {

  }

  build(data:Array<any>, title:string, file_name:string){
    this.options.headers = Object.keys(data[0]);
    this.options.title = title;
    return new AngularCsv(data, file_name,this.options);
  }
}
