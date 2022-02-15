import { ErrorFormat } from './ErrorFormat';
import { Notification } from './Notification';
import { User } from './user.model';
export interface ResponseFormat {
  success: boolean;
  data: any;
  error: ErrorFormat;
  user: User | null;
  token: string | null;
  notification?:Notification;
}
