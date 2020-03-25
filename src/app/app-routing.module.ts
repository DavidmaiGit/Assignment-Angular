import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ErropageComponent } from './erropage/erropage.component';
import { SignComponent } from './sign/sign.component';
import { ProductmanagerComponent } from './productmanager/productmanager.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'home', component: MainComponent},
  {path: '404', component: ErropageComponent},
  {path: 'signup', component: SignComponent},
  {path:'manager', component: ProductmanagerComponent},
  {path:'', redirectTo: 'home', pathMatch: "full"},
  {path:'**', redirectTo:'404', pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
