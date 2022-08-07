import {Product} from "./product";
import {User} from "./user";

export interface CartItem{
  id: string,
  quantity: number,
  date:string,
  product:Product,
  user: User,
}
