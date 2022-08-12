import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path :'login',
    component : LoginComponent
  },
  // {
  //   path :'profil',
  //   component : ProfilComponent
  // },

  {
    path :'register',
    component : RegisterComponent
  },
  {
    path :'layout',
    component : LayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
