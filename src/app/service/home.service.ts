import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {House} from "../model/house";

const API_URL = environment.apiUrl + "/homes"

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient : HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get(API_URL)
  }

  search(address: string, start: number, end: number, bathroom: number, bedroom: number, cus_begin: string, cus_end: string) : Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("address", address);
    queryParams = queryParams.append("start", start);
    queryParams = queryParams.append("end", end);
    queryParams = queryParams.append("bathroom", bathroom);
    queryParams = queryParams.append("bedroom", bedroom);
    queryParams = queryParams.append("cus_begin", cus_begin);
    queryParams = queryParams.append("cus_end", cus_end);
    return this.httpClient.get(API_URL + `/search-by-all`, {params: queryParams})
  }

  getTopOrder() : Observable<any>{
    return this.httpClient.get(API_URL + "/find-top-orders")
  }

  findById(id: any): Observable<House> {
    return this.httpClient.get<House>(API_URL + '/' + id);
  }
}
