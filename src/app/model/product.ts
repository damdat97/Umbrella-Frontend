import {Category} from "./category";
import {User} from "./user";

export interface Product {
  id: string,
  name:string,
  description: string,
  price: number,
  quantity: number,
  category: Category,
  user: User,
  image: any;
}
