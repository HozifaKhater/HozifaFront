import { Component, OnInit } from '@angular/core';
import { AuthService } from './../Services/auth.service';
import { RegisterModel } from './../Models/RegisterModel';
import { ResponseResultModel } from './../Models/ResponseResultModel';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _service:AuthService , private _toast:ToastrService,private _router:Router) { }

  ngOnInit() {
  }

  submit(form){
    this._service.register(form as RegisterModel).subscribe(
      res=>{
         var response = res as ResponseResultModel
         if(response.state){
            this._toast.success(response.data.message,"Registeration");
            this._router.navigate(['/Login']);
         }else{
            this._toast.error(response.errors,"Registeration");
         }
      },
      err=>{
        console.log(err);
      }
    )
  }

}
