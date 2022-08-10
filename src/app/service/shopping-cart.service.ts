import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product";
import {environment} from "../../environments/environment";
import {CartItem} from "../model/CartItem";
const API_URL=environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private httpClient: HttpClient) { }
  getAllCart(id: any): Observable<CartItem[]> {
    return this.httpClient.get<CartItem[]>(API_URL + '/shopping_carts/find-all-carts-by-userId/' +id);
  }
  save(cart: CartItem): Observable<CartItem> {
    return this.httpClient.post<CartItem>(API_URL + '/shopping_carts',cart);
  }
  findById(id: any): Observable<CartItem> {
    return this.httpClient.get<CartItem>(API_URL + '/shopping_carts/' + id)
  }
  remover(id: any): Observable<CartItem> {
    return this.httpClient.delete<CartItem>(API_URL + '/shopping_carts/cart/' + id);
  }
  updateCarItem(id: string, cartItem: CartItem): Observable<CartItem> {
    return this.httpClient.put<CartItem>(API_URL + '/shopping_carts/cart/' + id, cartItem);
  }

  checkout(id: string): Observable<boolean> {
    return this.httpClient.put<boolean>(API_URL + '/shopping_carts/checkout/' + id, null);
  }

  findBillByStatusEqualsZero(id:any): Observable<CartItem[]> {
    return this.httpClient.get<CartItem[]>(API_URL + '/shopping_carts/find-bill-by-status-equals-zero/' + id);
  }

  findBillByStatusEqualsOne(id:any): Observable<CartItem[]> {
    return this.httpClient.get<CartItem[]>(API_URL + '/shopping_carts/find-bill-by-status-equals-one/' + id);
  }

  findBillByStatusEqualsTwo(id:any): Observable<CartItem[]> {
    return this.httpClient.get<CartItem[]>(API_URL + '/shopping_carts/find-bill-by-status-equals-two/' + id);
  }

  findBillByStatusEqualsThree(id:any): Observable<CartItem[]> {
    return this.httpClient.get<CartItem[]>(API_URL + '/shopping_carts/find-bill-by-status-equals-three/' + id);
  }

  findBillByOwnerId(id:any): Observable<CartItem[]> {
    return this.httpClient.get<CartItem[]>(API_URL + '/shopping_carts/find-all-carts-by-ownerId/' + id);
  }
}
