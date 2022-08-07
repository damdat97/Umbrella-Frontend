import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
const API_URL = environment.apiUrl+"/comments";

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

  findCommentByProductId(id: any): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${API_URL}/find-comment-by-product-id/${id}`)
  }
}
