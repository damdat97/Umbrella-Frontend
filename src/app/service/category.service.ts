import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product";
import {Category} from "../model/category";
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(API_URL + '/categories');
  }
  findByIdCategory(id: any): Observable<Category> {
    return this.httpClient.get<Category>(API_URL + '/categories/' + id)
  }
}
