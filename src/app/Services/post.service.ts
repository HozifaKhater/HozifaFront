import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostModel } from '../Models/PostModel';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private _baseUrl = 'https://localhost:44397/api/Posts';
  constructor(private _http:HttpClient) { }

  postsList(){
    return this._http.get(this._baseUrl);
  }

  postItem(id:number){
    return this._http.get(this._baseUrl+'/'+id);
  }

  createPost(post:PostModel){
    var head = new HttpHeaders().set('Authorization','Bearer '+localStorage.getItem('token'))
      return this._http.post(this._baseUrl,post,{headers : head});
  }

  updatePost(id:number,post:PostModel){
    var head = new HttpHeaders().set('Authorization','Bearer '+localStorage.getItem('token'))
      return this._http.put(this._baseUrl+'/'+id,post,{headers:head});
  }

  deletePost(id:number){
    var head = new HttpHeaders().set('Authorization','Bearer '+localStorage.getItem('token'))
    return this._http.delete(this._baseUrl+'/'+id,{headers:head});
  }
}
