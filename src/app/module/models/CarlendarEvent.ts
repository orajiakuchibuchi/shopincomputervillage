export interface CarlendarEvent {
  id?: number;
  icon: string;
  title: string;
  description: string;
  start: string;
  end: string;
  type: string;
  className: string;
  allDay: boolean;
  user_id?: number;
  created_at?: any;
  updated_at?: any;
}
