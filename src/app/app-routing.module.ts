import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './Posts/list/list.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './Posts/create/create.component';
import { UpdateComponent } from './Posts/update/update.component';
import { AuthGuard } from './Guards/auth.guard';



const routes: Routes = [
  { path:'',component:ListComponent,pathMatch:'full' },
  { path:'Register',component:RegisterComponent,pathMatch:'full' },
  { path:'Login',component:LoginComponent,pathMatch:'full' },
  { path:'CreatePost',component:CreateComponent,pathMatch:'full' ,canActivate:[AuthGuard]},
  { path:'EditPost/:id',component:UpdateComponent,pathMatch:'full' , canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
