import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/Services/post.service';
import { Router } from '@angular/router';
import { PostModel } from 'src/app/Models/PostModel';
import { ToastrService } from 'ngx-toastr';
import { ResponseResultModel } from 'src/app/Models/ResponseResultModel';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private _service : PostService, private _router:Router,private _toastr:ToastrService) { }

  ngOnInit() {
  }

  submit(form){
    this._service.createPost(form as PostModel).subscribe(
      res=>{
        var response= res as ResponseResultModel
        if(response.state){
          this._toastr.success(response.data.message,"Success");
          this._router.navigate(['']);
        }else{
          this._toastr.error(response.errors,"Faild");
        }
      },
      err=>{
        this._toastr.error("Faild To Create");
      }
    );
  }

}
