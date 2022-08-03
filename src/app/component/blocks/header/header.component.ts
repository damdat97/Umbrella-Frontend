import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../service/authentication.service";
import {ProductService} from "../../../service/product.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin = false;
  username: any;
  id: any
  products: any

  constructor(private authenticationService: AuthenticationService,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.isLogin = localStorage.getItem("USERNAME") == null ? false : true;
    this.username = localStorage.getItem("USERNAME")
    this.id = localStorage.getItem("ID")
    this.findProductByUserId(this.id)
  }

  findProductByUserId(id: any) {
    this.productService.findProductByUserId(id).subscribe((data)=>{
      this.products=data;

    })
  }

  logOut() {
    this.authenticationService.logout();
    this.isLogin = false;
  }

}
