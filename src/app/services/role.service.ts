import { catchError, map } from 'rxjs/operators';
import { IndexedDbService } from './indexed-db.service';
import { Role } from './../module/models/role.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { handleError } from '../module/models/ErrorFormat';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private indexedDbService: IndexedDbService) { }
  setRoles(roles: Role[]){
    console.log(roles);
    roles.forEach(role=> {
      this.indexedDbService.dbService.getByID(IndexedDbService.ROLES_TABLE ,role.id).subscribe(r=>{
        if(!r){
          this.indexedDbService.dbService.add(IndexedDbService.ROLES_TABLE, role).subscribe(response=>{
            console.log("Role successfully inserted to client DB: ", response);
          });
        }
      })
    })
  }
  async hasRole(name:string): Promise<Observable<Role>>{
    const role = await this.indexedDbService.dbService.getByIndex<Role>(IndexedDbService.ROLES_TABLE, 'name', name)
                  .pipe(
                    // catchError(handleError),
                    map((response:Role)=> {return response;})
                  );
    return role;
  }
}
