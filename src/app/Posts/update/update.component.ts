import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/Services/post.service';
import { PostModel } from 'src/app/Models/PostModel';
import { ResponseResultModel } from 'src/app/Models/ResponseResultModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
// Dynamic parameters for this component's route: /example-params/:first/:second
routeParams: Params;
postId:number;
post:PostModel;
isLoaded = false;
  constructor(private activatedRoute: ActivatedRoute , private _service : PostService, private _toastr:ToastrService,private _router:Router) { }

  ngOnInit() {
    this.getRouteParams();
    this.getPost();
  }

  getRouteParams() {

    // Route parameters
    this.activatedRoute.params.subscribe( params => {
        this.routeParams = params;
        this.postId = params.id;
    });
 }


getPost(){
  this._service.postItem(this.postId).subscribe(
    res=>{
        var response = res as ResponseResultModel
        if(response.state){
          this.post = response.data.result as PostModel;
          this.isLoaded = true;
        }else{
            this._toastr.error(response.errors,"Load Faild");
            this._router.navigate(['']);
        }
    },
    err=>{
      this._toastr.error("Not Found","Load Faild");
      this._router.navigate(['']);

    }
  );
}

submit(form){
  this._service.updatePost(this.postId,form as PostModel).subscribe(
    res=>{
        var response = res as ResponseResultModel
        if(response.state){
            this._toastr.success(response.data.message,"Update Successeded")
            this._router.navigate(['']);
        }else{
          this._toastr.error(response.errors,"Update Faild");
        }
    },
    err=>{
      this._toastr.error("Faild to Update Post","Update Faild");
    }
  );
}

}
