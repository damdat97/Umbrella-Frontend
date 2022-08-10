import {Product} from "./product";
import {User} from "./user";

export interface CartItem{
  id: number,
  quantity: number,
  status: number,
  date:string,
  product:Product,
  user: User,
  shop: User,
  billId: string
}
