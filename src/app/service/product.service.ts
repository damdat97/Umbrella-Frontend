import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Product} from "../model/product";
import {Observable} from "rxjs";
import {Category} from "../model/category";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {
  }
  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(API_URL + '/products');
  }
  findById(id: any): Observable<Product> {
    return this.httpClient.get<Product>(API_URL + '/products/' + id)
  }
  findNewProduct(): Observable<Product> {
    return this.httpClient.get<Product>(API_URL + '/products/find-new-products')
  }
  delete(id: any): Observable<Product> {
    return this.httpClient.delete<Product>(API_URL + '/products/' + id);
  }
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.httpClient.put<Product>(API_URL + '/products/' + id, product);
  }
  findProductByCategories(id: any): Observable<Product[]>{
    return this.httpClient.get<Product[]>(API_URL + '/products/find-products-by-category/' + id)
  }

  save(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(API_URL + '/products', product);
  }
}
