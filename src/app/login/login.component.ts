import { Component, OnInit } from '@angular/core';
import { AuthService } from './../Services/auth.service';
import { LoginModel } from './../Models/LoginModel';
import { ResponseResultModel } from './../Models/ResponseResultModel';
import { ToastrService } from 'ngx-toastr';
import { LoginResponseModel } from '../Models/LoginResponseModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _service:AuthService , private _toastr: ToastrService , private _router:Router) { }

  ngOnInit() {
  }

  submit(form){
        console.log(form);
        this._service.login(form as LoginModel).subscribe(
          res=>{
              var response = res as ResponseResultModel
              if(response.state){
                var result = response.data.result as LoginResponseModel
                  this._toastr.success("Welcome "+result.fullName,"Login Success");
                  localStorage.setItem('token',result.token);
                  localStorage.setItem('fullName',result.fullName);
                  this._service.isLogged = true;
                  this._service.userName = result.fullName;
                    this._router.navigate(['']);
              }else{
                  this._toastr.error(response.errors,"Login Faild");
              }
          },
          err=>{
            console.log(err);
          }
        )

  }

}
