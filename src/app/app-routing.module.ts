import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieComponent } from './components/categorie/categorie.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { ProduitComponent } from './components/produit/produit.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path :'login',
    component : LoginComponent
  },

  {
    path :'user',
    component : RegisterComponent
  },
  {
    path :'categorie',
    component : CategorieComponent
  },
  {
    path : 'produit',
    component : ProduitComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
