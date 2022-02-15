import { Image } from "./Image";
export interface Product {
  id: number;
  name: string;
  images: Image[];
  price: number;
  quantity: number;
  discount: number;
  storeId: number;
  size?: number;
  color?: string;
  description?: string;
}
