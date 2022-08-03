import {User} from "./user";
import {Product} from "./product";

export interface Comment {
  id: string,
  product : Product,
  owner: User,
  description: string,

}
