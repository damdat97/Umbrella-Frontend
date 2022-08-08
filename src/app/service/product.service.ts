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
    return this.httpClient.get<Product[]>(API_URL + '/products/?_sort=id&_order=desc');
  }
  findById(id: any): Observable<Product> {
    return this.httpClient.get<Product>(API_URL + '/products/' + id)
  }
  findNewProduct(id: any): Observable<Product[]> {
    return this.httpClient.get<Product[]>(API_URL + '/products/find-new-products/' + id)
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
  searchByAll( name:any,description:any,from:any,to:any):Observable<Product[]> {
    return this.httpClient.get<Product[]>(API_URL + '/products/find-products-by-filter?name='+name+'&description='+description+'&from='+from+'&to='+to );
  }
  findProductByName(name: any): Observable<Product[]> {
    return this.httpClient.get<Product[]>(API_URL + '/products/find-products-by-name?name=' + name)
  }
  sortProductByQuantity(id: any):Observable<Product[]>{
    return this.httpClient.get<Product[]>(API_URL + '/products/sort-products-by-quantity/' + id)
  }
  findProductByUserId(id:any):Observable<Product[]>{
    return this.httpClient.get<Product[]>(API_URL + '/products/find-my-shop/' + id)
  }

  findAllProductByUserIdNot(id: any): Observable<Product[]> {
    return this.httpClient.get<Product[]>(API_URL + '/products/find-products-by-user-id-not/' + id)
  };

  findAllProductByCategoryAndUserIdNot(categoryId: any, userId: any): Observable<Product[]> {
    return this.httpClient.get<Product[]>(API_URL + '/products/find-products-by-category-and-user-id-not/' + categoryId + '/' + userId)
  }

  findProductsByCustomerId(customerId: any, userId: any): Observable<Product[]> {
    return this.httpClient.get<Product[]>(API_URL + '/products/find-products-by-customer-id/' + customerId +'/' + userId)
  }
}
