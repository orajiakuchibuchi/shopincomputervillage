import { Privilege } from "./privilege.model";

export interface Role {
  active: boolean | number
  created_at: string | Date;
  default: boolean | number
  description: string | null
  id: number;
  name: string
}

// export class Role {
//   public id: Number;
//   public name: String = '';
//   private privileges: Privilege[];

//   constructor(id: Number, name: String, privileges: Privilege[]){
//     this.id = id;
//     this.name = name;
//     this.privileges = privileges;
//   }

//   getPrivileges(): Privilege[] {
//     return this.privileges;
//   }
//   toString(): String{
//     return `Role of ${this.name} has the following privileges: ${this.privileges.forEach((p)=>{p.description + ','})}`
//   }
//   hasPrivilege(name: String){
//     const privilege = this.privileges.find(x => x.name.toLocaleLowerCase() == name.toLocaleLowerCase());
//     if(privilege){
//       return true;
//     }
//     return false;
//   }
// }
