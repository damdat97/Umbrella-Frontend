import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
const API_URL = environment.apiUrl+"/images";
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) { }

  save(image: any): Observable<any>{
    return this.httpClient.post(API_URL , image);
  }
  findByIdProduct(id: any):Observable<any>{
    return this.httpClient.get(API_URL + `/products/${id}`);
  }
  showFullProduct(id: any):Observable<any>{
    return this.httpClient.get(API_URL + `/${id}`);
  }
}
