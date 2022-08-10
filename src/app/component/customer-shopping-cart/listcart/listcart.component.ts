import {Component, OnInit} from '@angular/core';
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
              private cartService: ShoppingCartService,
              private activatedRouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id)
    })
    this.getAllCartByCustomerId();
  }

  getBillByStatusEqualsZero() {
    this.cartService.findBillByStatusEqualsZero(this.userId).subscribe((data) => {
      console.log(data)
      this.carts = data;

      console.log(data)
    }, error => {
      console.log(error);
    })
  };

  getBillByStatusEqualsOne() {
    this.cartService.findBillByStatusEqualsOne(this.userId).subscribe((data) => {
      this.carts = data;
      // this.countProduct = this.carts.length ;
      // this.totalMoney = this.total(this.carts);
      console.log(data)
    }, error => {
      console.log(error);
    })
  };

  getBillByStatusEqualsTwo() {
    this.cartService.findBillByStatusEqualsTwo(this.userId).subscribe((data) => {
      this.carts = data;
      // this.countProduct = this.carts.length ;
      // this.totalMoney = this.total(this.carts);
      console.log(data)
    }, error => {
      console.log(error);
    })
  };

  getBillByStatusEqualsThree() {
    this.cartService.findBillByStatusEqualsThree(this.userId).subscribe((data) => {
      this.carts = data;
      // this.countProduct = this.carts.length ;
      // this.totalMoney = this.total(this.carts);
      console.log(data)
    }, error => {
      console.log(error);
    })
  };




  private getAllCartByCustomerId() {
    this.cartService.findAllCartByCustomerId(this.userId).subscribe((data) => {
      this.carts = data;
      // this.countProduct = this.carts.length ;
      // this.totalMoney = this.total(this.carts);
      console.log(data)
    }, error => {
      console.log(error);
    })
  }



}
