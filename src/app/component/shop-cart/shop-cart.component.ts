import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../service/product.service";
import {ShoppingCartService} from "../../service/shopping-cart.service";
import {CartItem} from "../../model/CartItem";

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css']
})
export class ShopCartComponent implements OnInit {
 carts: CartItem[] | any;
  constructor(private productService: ProductService ,
              private cartService: ShoppingCartService) { }

  ngOnInit(): void {
    // this.getAllCart();
  }
getAllCart(){
  this.cartService.getAllCart().subscribe((data) => {
    console.log(data)
    this.carts = data;
  }, error => {
    console.log(error)
  })
};
  delete(){
    alert("xóa")
  }
  upCountPr(){
    alert("tăng sản phẩm");
  }
  // gọi api để giảm sản phẩm *** vd: const param: {cartItemId: ..., Count:... }
  downCountPr(){
    alert("giảm sản phẩm");
  }
  // gọi api để thực hiện thanh toán.
  checkOut(){
    alert("đã thanh toán giỏ hàng");

  }
}
