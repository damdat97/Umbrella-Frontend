import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product";
import {User} from "../model/user";
const API_URL = environment.apiUrl+"/comments";

interface Comment {

  id: string,
  product : Product,
  owner: User,
  description: string,
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor( private httpClient :HttpClient) { }

  getAllComment(): Observable<any> {
    return this.httpClient.get(API_URL)
  }

  save(comment: any): Observable<any>{
    return this.httpClient.post(API_URL , comment);
  }
  findAllByCommentId(id: any):Observable<any>{
    return this.httpClient.get(API_URL + `/${id}`);
  }

  findById(id: any): Observable<Comment> {
    return this.httpClient.get<Comment>(`${API_URL}/comments/${id}`)
  }

}
