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
  getAllCart(): Observable<CartItem[]> {
    return this.httpClient.get<CartItem[]>(API_URL + '/shopping_carts');
  }
  save(cart: CartItem): Observable<CartItem> {
    return this.httpClient.post<CartItem>(API_URL + '/shopping_carts',cart);
  }
  findById(id: any): Observable<CartItem> {
    return this.httpClient.get<CartItem>(API_URL + '/shopping_carts/' + id)
  }
  remover(id: any): Observable<CartItem> {
    return this.httpClient.delete<CartItem>(API_URL + '/shopping_carts/' + id);
  }
  updateCarItem(id: string, cartItem: CartItem): Observable<CartItem> {
    return this.httpClient.put<CartItem>(API_URL + '/shopping_carts/' + id, cartItem);
  }
}
