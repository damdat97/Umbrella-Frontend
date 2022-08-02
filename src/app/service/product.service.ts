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
  findNewProduct(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(API_URL + '/products/find-new-product')
  }
  delete(id: any): Observable<Product> {
    return this.httpClient.delete<Product>(API_URL + '/products/' + id);
  }
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.httpClient.put<Product>(API_URL + '/products/' + id, product);
  }
  findProductByCategories(id: any): Observable<Product>{
    return this.httpClient.get<Product>(API_URL + '/products/find-product-by-category/' + id)
  }
  // searchByName(name:any):Observable<Product[]> {
  //   return this.httpClient.get<Product[]>(API_URL + '/products/find-by-name?name='+name);
  // }

  save(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(API_URL + '/products', product);
  }
  searchByAll( name:any,category_id:any,from:any,to:any):Observable<Product[]> {
    return this.httpClient.get<Product[]>(API_URL + '/products/find?name='+name+'&category_id'+category_id+'&from='+from+'&to='+to );
  }
}
