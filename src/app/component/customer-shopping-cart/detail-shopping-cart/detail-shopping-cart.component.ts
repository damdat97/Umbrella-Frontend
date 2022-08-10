import { Component, OnInit } from '@angular/core';
import {CartItem} from "../../../model/CartItem";
import {ProductService} from "../../../service/product.service";
import {ShoppingCartService} from "../../../service/shopping-cart.service";
import {ActivatedRoute} from "@angular/router";
import {ImageService} from "../../../service/image.service";

@Component({
  selector: 'app-detail-shopping-cart',
  templateUrl: './detail-shopping-cart.component.html',
  styleUrls: ['./detail-shopping-cart.component.css']
})
export class DetailShoppingCartComponent implements OnInit {
  countProduct: number = 0;
  totalMoney: number = 0;
  totalQuantity1: number = 0;
  carts: CartItem[] | any;
  userId = localStorage.getItem("ID")

  constructor(private productService: ProductService,
              private cartService: ShoppingCartService,
              private activatedRoute: ActivatedRoute,
              private imageService: ImageService) { }

  ngOnInit(): void {
    this.activatedRoute.snapshot.queryParamMap.get('billId');
    this.findDetailBill();
  }

  findDetailBill() {
      const billId = this.activatedRoute.snapshot.queryParamMap.get('billId');
      this.cartService.findDetailBill(billId).subscribe((data) => {
        this.carts = data;
        console.log(data)
        this.countProduct = this.carts.length;
        this.totalMoney = this.total(this.carts);
        this.totalQuantity1= this.totalQuantity(this.carts)
        for (let i = 0; i < data.length; i++) {
          this.imageService.findAllByProductId(data[i].product.id).subscribe((image) => {
            this.carts[i].product.image = image;
            console.log(this.carts)
          })
        }
      }, error => {
        console.log(error);
      })
    }

  private total(carts: CartItem[]) {
    let result = 0;
    for (let i = 0; i < carts.length; i++) {
      result += (carts[i].quantity * carts[i].product.price);
    }
    return result;
  }
  private totalQuantity(cart:CartItem[]){
    let count=0;
    for (let i=0;i<cart.length;i++){
      count+=cart[i].quantity;
    }
    return count;
  }
}
