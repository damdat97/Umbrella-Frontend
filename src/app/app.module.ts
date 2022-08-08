import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from "./component/pages/home/home.component";
import {RegisterComponent} from "./component/pages/register/register.component";
import {LoginComponent} from "./component/pages/login/login.component";
import {FooterComponent} from "./component/blocks/footer/footer.component";
import {NavbarComponent} from "./component/blocks/navbar/navbar.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JwtInterceptor} from "./helper/jwt-interceptor";
import {ErrorInterceptor} from "./helper/error-interceptor";
import {HeaderComponent} from "./component/blocks/header/header.component";
import {DetailProductComponent} from "./component/product/detail-product/detail-product.component";
import {EditComponent} from "./component/product/edit/edit.component";
import {ListCategoryComponent} from "./component/category/list-category/list-category.component";
import {NgxPaginationModule} from "ngx-pagination";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {ProductByCategoryComponent} from "./component/product/product-by-category/product-by-category.component";
import {DeleteComponent} from './component/product/delete/delete.component';
import {ListProductComponent} from './component/my-shop/list-product/list-product.component';
import {EditProductComponent} from './component/my-shop/edit-product/edit-product.component';

import {CreateCommentComponent} from './component/comment/create-comment/create-comment.component';
import {ListCommentComponent} from './component/comment/list-comment/list-comment.component';
import {CreateProductComponent} from "./component/my-shop/create-product/create-product.component";
import {AllProductComponent} from './component/product/all-product/all-product/all-product.component';
import {NgToastModule} from "ng-angular-popup";
import {ShopCartComponent} from './component/shop-cart/shop-cart.component';

import {ImageComponent} from './component/blocks/image/image.component';
import {ListComponent} from "./component/product/list/list.component";
import { CustomerComponent } from './component/user/customer/customer.component';
import { CustomerShopComponent } from './component/user/customer-shop/customer-shop.component';
import {IvyCarouselModule} from "angular-responsive-carousel";
import { NewProductComponent } from './component/product/new-product/new-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    NavbarComponent,
    HeaderComponent,
    DetailProductComponent,
    EditComponent,
    ListCategoryComponent,
    ProductByCategoryComponent,
    DeleteComponent,
    ListProductComponent,
    EditProductComponent,
    CreateProductComponent,
    CreateCommentComponent,
    ListCommentComponent,
    AllProductComponent,
    ImageComponent,
    ListComponent,
    ShopCartComponent,
    CustomerComponent,
    CustomerShopComponent,
    NewProductComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
    FormsModule,
    NgToastModule,
    IvyCarouselModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor, multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
