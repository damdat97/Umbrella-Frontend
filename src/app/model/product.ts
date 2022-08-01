import {Category} from "./category";
import {User} from "./user";

export interface Product {
  id: string,
  name:string,
  description: string,
  price: string,
  quantity: string,
  category: Category,
  owner: User

}
