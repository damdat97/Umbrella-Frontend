import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Product} from "../model/product";
import {Observable} from "rxjs";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {
  }
  // getAll(): Observable<Product> {
  //   return this.httpClient.get<Product>(API_URL + '/products');
  // }
  findById(id: any): Observable<Product> {
    return this.httpClient.get<Product>(API_URL + '/products/' + id)
  }
  findNewProduct(): Observable<Product> {
    return this.httpClient.get<Product>(API_URL + '/products/find-new-product')
  }
  delete(id: any): Observable<Product> {
    return this.httpClient.delete<Product>(API_URL + '/products/' + id);
  }
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.httpClient.put<Product>(API_URL + '/products/' + id, product);
  }
  searchByName(name:any):Observable<Product[]> {
    return this.httpClient.get<Product[]>(API_URL + '/products/find-by-name?name='+name);
  }

  save(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(API_URL + '/products', product);
  }
  getAllProduct():Observable<Product>{
    return this.httpClient.get<Product>(API_URL + '/products');
  }

  // @ts-ignore
  // getAllPro(request){
  //   const params=request;
  //   return this.httpClient.get(API_URL+'/products',{params})
  // }
}
