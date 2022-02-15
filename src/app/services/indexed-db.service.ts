import { Role } from './../module/models/role.model';
import { Product } from './../module/models/Product';
import { NavNotificationComponent } from './../shared/header/nav-notification/nav-notification.component';
import { HttpClient } from '@angular/common/http';
import { ResponseFormat } from './../module/models/ResponseFormat';
import { NotificationService } from './notification.service';
// import { ErrorFormat, handleError } from './../module/models/ErrorFormat';
import { Store } from './../module/models/Store';
import { catchError, map, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { NgxIndexedDBService, DBConfig } from 'ngx-indexed-db';
import { migrationFactory } from './../module/database/migrations/migrationFactory';
import { Observable, throwError } from 'rxjs';
import { Notification } from '../module/models/Notification';
import { environment } from 'src/environments/environment';
import { indexOf } from 'underscore';
import { Schemas}  from '../module/database/schema/index';
import { Estate } from '../module/models/Estate';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  public static USERS_TABLE = 'users';
  public static SESSION_TABLE = 'sessions';
  public static STORE_TABLE = 'stores';
  public static ROLES_TABLE = 'roles';
  public static NOTIFICATION_TABLE = 'notifications';
  public static CLIENT_ERROR = 'client-errors';
  public static ESTATE_TABLE = 'estates';
  public static PRODUCT_TABLE = 'products';
  public static DB_NAME = 'DesktopAppDb';
  public static DB_VERSION = 1;
  constructor(public dbService: NgxIndexedDBService,
              private http: HttpClient) { }
  addToDb(databaseName: string, keyValue: FormData){
    const model:any = {};
    for (var pair of keyValue.entries()) {
      model[pair[0]] = pair[1]
    }
    return this.dbService.add(databaseName, model).pipe(catchError((err: any) =>{
      console.log(err);
      return throwError('');
    }));
  }
  getStores(): Observable<Store[]> {
    return this.dbService.getAll<Store[]>(IndexedDbService.STORE_TABLE)
          .pipe(map((data: any)=>{
            return data as Store[];
          }))
  }
  getEstates(): Observable<Estate[]> {
    return this.dbService.getAll<Estate[]>(IndexedDbService.ESTATE_TABLE)
          .pipe(map((data: any)=>{
            return data as Estate[];
          }))
  }
  getProducts(): Observable<Product[]> {
    return this.dbService.getAll<Store[]>(IndexedDbService.PRODUCT_TABLE)
          .pipe(map((data: any)=>{
            return data as Product[];
          }))
  }
  getDbTable(tableName: string){
    return this.dbService.getAll(tableName);
  }


  private static getSchemas(){
    const schemaList:Array<any> = [];
    Schemas.forEach(schema=>{
      schemaList.push(
        {
          store: schema.name,
          storeConfig: { keyPath: 'id', autoIncrement: true },
          storeSchema: schema.columns,
        }
      )
    });
    return schemaList;
  }
  public static initalize(): DBConfig{
    this.getSchemas();
    return {
      name: IndexedDbService.DB_NAME,
      version: IndexedDbService.DB_VERSION,
      objectStoresMeta: IndexedDbService.getSchemas()
    }
  }
  async loadServerNotifications(): Promise<Observable<Notification[]>> {
    const serverNotification = await this.http.get<ResponseFormat>(`${NotificationService.baseUrl}/get-notifications`)
                            .pipe(
                              retry(1),
                              // catchError(handleError),
                              map((response: ResponseFormat) =>
                              {return response.data;}
                              ));;
    return serverNotification;
  }
  addNotification(notificaiton: Notification){
      this.dbService.add(IndexedDbService.NOTIFICATION_TABLE, {
        id: notificaiton.id,
        title: notificaiton.title,
        message: notificaiton.message,
        icon: `${environment.serverUrl + notificaiton.icon}`,
        created_at: notificaiton.created_at,
        updated_at: notificaiton.updated_at,
        user_id: notificaiton.user_id,
      }).subscribe();
  }
  loadNotifications(): Observable<Notification[]> {
    const serverNotification = this.loadServerNotifications();
    serverNotification.then((rsolv)=>{
      rsolv.subscribe(notifications=>{
        if(notifications && notifications.length > 0){
          notifications.forEach((n)=>{
            this.dbService.getByID(IndexedDbService.NOTIFICATION_TABLE, n.id).subscribe(x=>{
              if(!x){
                this.addNotification(n);
              }
            })
          });
        }
        // NavNotificationComponent.nList = notifications;
      })
    });;
    return this.dbService.getAll<Notification[]>(IndexedDbService.NOTIFICATION_TABLE)
          .pipe(map((data: any)=>{
            return data as Notification[];
          }))
  }
}
