export interface Booking {
  id: number;
  transId: string;
  location: string;
  email: string;
  phone: string;
  name: string;
  perPrice: number;
  start: Date;
  end: Date;
  account_number: string;
  account_name: string;
  bank: string;
  initialPayment: number;
  total: number;
  customPrice: boolean;
  status: string
  active: string
}

