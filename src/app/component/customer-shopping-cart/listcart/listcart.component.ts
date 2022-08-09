import { Component, OnInit } from '@angular/core';
import {CartItem} from "../../../model/CartItem";
import {FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../../../service/product.service";
import {ShoppingCartService} from "../../../service/shopping-cart.service";
import {ImageService} from "../../../service/image.service";
import {ActivatedRoute} from "@angular/router";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-listCart',
  templateUrl: './listCart.component.html',
  styleUrls: ['./listCart.component.css']
})
export class ListCartComponent implements OnInit {
  countProduct: number = 0;
  totalMoney: number = 0;
  carts: CartItem[] | any;
  userId = localStorage.getItem("ID")
  id: any

  constructor(private productService: ProductService,
              private cartService: ShoppingCartService) {
  }

  ngOnInit(): void {
    this.getAllCart();
  }

  getAllCart() {
    this.cartService.getAllCart(this.userId).subscribe((data) => {
      this.carts = data;
      this.countProduct = this.carts.length ;
      this.totalMoney = this.total(this.carts);
      console.log(data)
    }, error => {
      console.log(error);
    })
  };

  private total(carts: CartItem[]) {
    let result = 0;
    for (let i = 0; i < carts.length; i++) {
      result += (carts[i].quantity * carts[i].product.price);
    }
    return result;
  }
}
