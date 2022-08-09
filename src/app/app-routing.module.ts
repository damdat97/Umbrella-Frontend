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
import {ShopCartComponent} from "./component/shop-cart/shop-cart.component";

import * as events from "events";
import {CustomerComponent} from "./component/user/customer/customer.component";
import {CustomerShopComponent} from "./component/user/customer-shop/customer-shop.component";
import {ListCartComponent} from "./component/customer-shopping-cart/listcart/listcart.component";

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
    path:'shop-cart',
    component:ShopCartComponent
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
  },
  {
    path: "all-customers",
    component: CustomerComponent
  },
  {
    path: "customer-shop/:id",
    component: CustomerShopComponent
  },
  {
    path: "carts",
    component: ListCartComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
