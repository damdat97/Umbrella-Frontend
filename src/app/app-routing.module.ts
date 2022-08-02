import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./component/pages/home/home.component";
import {LoginComponent} from "./component/pages/login/login.component";
import {RegisterComponent} from "./component/pages/register/register.component";
import {DetailProductComponent} from "./component/product/detail-product/detail-product.component";
import {EditComponent} from "./component/product/edit/edit.component";
import {ProductByCategoryComponent} from "./component/product/product-by-category/product-by-category.component";
import {CreateProductComponent} from "./component/product/create-product/create-product.component";

const routes: Routes = [
  {
  path: "",
  component: HomeComponent,
},
  {
    path:'product-detail/:id',
    component:DetailProductComponent
  },
  {
    path:'product-by-category/:id',
    component:ProductByCategoryComponent
  },
  {
    path:'edit-product/:id',
    component:EditComponent
  },{
    path:'create-product',
    component:CreateProductComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
