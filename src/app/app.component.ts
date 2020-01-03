import { Component,OnInit } from '@angular/core';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _service:AuthService) {}

  ngOnInit() {
    var fullName = localStorage.getItem('fullName');
    if(fullName != null){
        this._service.userName = fullName;
        this._service.isLogged = true;
    }
  }

  Logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
    this._service.isLogged = false;
    this._service.userName = '';
  }

  title = 'Hozifa';
}
