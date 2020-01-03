import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterModel } from './../Models/RegisterModel';
import { LoginModel } from '../Models/LoginModel';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseUrl = "https://localhost:44397/api/Users/";
  isLogged = false;
  userName = '';
  constructor(private _http : HttpClient) { }

  register(register:RegisterModel){
      return this._http.post(this._baseUrl+'Register',register);
  }

  login(login:LoginModel){
    return this._http.post(this._baseUrl+'Login',login);
  }

}
