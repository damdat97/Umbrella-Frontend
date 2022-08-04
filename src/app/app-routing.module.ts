import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./component/pages/home/home.component";
import {LoginComponent} from "./component/pages/login/login.component";
import {RegisterComponent} from "./component/pages/register/register.component";
import {DetailProductComponent} from "./component/product/detail-product/detail-product.component";
import {EditComponent} from "./component/product/edit/edit.component";
import {ProductByCategoryComponent} from "./component/product/product-by-category/product-by-category.component";
import {CreateProductComponent} from "./component/my-shop/create-product/create-product.component";
import {ListProductComponent} from "./component/my-shop/list-product/list-product.component";
import {EditProductComponent} from "./component/my-shop/edit-product/edit-product.component";
import {AllProductComponent} from "./component/product/all-product/all-product/all-product.component";

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
    path:'my-shop/:id',
    component:ListProductComponent
  },
  {
    path:'products-by-categories/:id',
    component:ProductByCategoryComponent
  },
  {
    path:'edit-product-my-shop/:id',
    component:EditProductComponent
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
  },
  {
    path: "all-products",
    component:AllProductComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
