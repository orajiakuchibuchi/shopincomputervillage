import { User } from './user.model';


export interface Store {
  id: number;
  icon: string;
  name: string;
  url: string;
  phone: string;
  address: string;
  manager: User;
  created_at: any;
  updated_at: any;
}
