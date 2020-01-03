import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/Services/post.service';
import { ResponseResultModel } from 'src/app/Models/ResponseResultModel';
import { PostModel } from 'src/app/Models/PostModel';
import { ToastrService, Toast } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    posts : PostModel[];
    isLoaded = false;
    isLogged = false;
  constructor(private _service :PostService,private _toastr:ToastrService) { }

  ngOnInit() {
    this.getPostsList();
    var fullName = localStorage.getItem('fullName');
    if(fullName != null){
      this.isLogged = true;
    }
  }

  getPostsList(){
      this._service.postsList().subscribe(
        res=>{
              var response = res as ResponseResultModel
              if(response.state){
                this.isLoaded = true;
                  this.posts = response.data.result as PostModel[];
              }else{
                  this._toastr.error(response.errors,"Faild to Load");
              }
        },
        err=>{
          console.log(err)
          this._toastr.error("Not Found","Faild to Load");
        }
      );
  }

  delete(id:number){
    this._service.deletePost(id).subscribe(
      res=>{
        var response = res as ResponseResultModel
        if(response.state){
            this._toastr.success(response.data.message,"Delete Successeded");
            this.getPostsList();
        }else{
          this._toastr.error(response.errors,"Delete Faild");
        }
      },
      err=>{
        this._toastr.error("Not Found","Delete Faild");
      }
    );
  }

}
