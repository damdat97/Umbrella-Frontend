import {Category} from "./category";
import {User} from "./user";
import firebase from "firebase/compat";
import UserMetadata = firebase.auth.UserMetadata;

export interface Product {
  id: string,
  name:string,
  description: string,
  price: string,
  quantity: string,
  category: Category,
  user: User,
  image: string
}
