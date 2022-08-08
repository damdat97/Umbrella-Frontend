import { Component, OnInit } from '@angular/core';
import {Product} from "../../../model/product";
import {ProductService} from "../../../service/product.service";
import {ImageService} from "../../../service/image.service";
import {NgToastService} from "ng-angular-popup";
import {ShoppingCartService} from "../../../service/shopping-cart.service";
import {CartItem} from "../../../model/CartItem";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  products: Product[] | any;
  image: any;
  userId = localStorage.getItem("ID")

  constructor(private productService: ProductService,
              private imageService: ImageService,
              private toast: NgToastService,
              private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.findNewProduct()
  }

  findNewProduct() {
      this.productService.findNewProduct(this.userId).subscribe((data) => {
        this.products = data
        console.log("1", data)
        for (let i = 0; i < data.length; i++) {
          this.imageService.findAllByProductId(data[i].id).subscribe((image) => {
            this.products[i].image = image;
            console.log(this.products)
          })
        }
      })
  }

  addToShoppingCart(item: any) {
    // @ts-ignore
    const cartItem: CartItem = {
      product: item,
      quantity: 1,
    }
    console.log(cartItem);
    this.shoppingCartService.save(cartItem).subscribe(() => {});
  }
}
