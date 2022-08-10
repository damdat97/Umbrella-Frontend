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
              private cartService: ShoppingCartService) {
  }

  ngOnInit(): void {
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
      this.totalMoney = this.total(this.carts);
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

  sortByCart(event: any) {
    if (event == 0) {
      this.getBillByStatusEqualsZero();
    }
    if(event==1){
      this.getBillByStatusEqualsOne();
    }
    if(event==2){
      this.getBillByStatusEqualsTwo();
    }
    if(event==3){
      this.getBillByStatusEqualsThree();
    }
  }


  private getAllCartByCustomerId() {
    this.cartService.findAllCartByCustomerId(this.userId).subscribe((data) => {
      this.carts = data;
      // this.countProduct = this.carts.length ;
      this.totalMoney = this.total(this.carts);
      console.log(data)
      for (let i = 0; i < this.carts.length; i++) {
        localStorage.setItem("BILLID", this.carts[i].billId);
      }
    }, error => {
      console.log(error);
    })
  }

  total(carts: CartItem[]) {
    let result = 0;
    for (let i = 0; i < carts.length; i++) {
      result += (carts[i].quantity * carts[i].product.price);
    }
    return result;
  }

}
