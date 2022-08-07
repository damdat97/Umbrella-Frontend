import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../service/product.service";
import {ShoppingCartService} from "../../service/shopping-cart.service";
import {CartItem} from "../../model/CartItem";
import {ImageService} from "../../service/image.service";

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css']
})
export class ShopCartComponent implements OnInit {
  countProduct: number = 0;
  totalMoney: number = 0;
 carts: CartItem[] | any;
  constructor(private productService: ProductService ,
              private cartService: ShoppingCartService,
              private imageService: ImageService) { }

  ngOnInit(): void {
    this.getAllCart();
  }
getAllCart(){
  this.cartService.getAllCart().subscribe((data) => {
    this.carts = data;
    this.countProduct = this.carts.length;
    this.totalMoney = this.total(this.carts);
    for (let i = 0; i < data.length; i++) {
      this.imageService.findAllByProductId(data[i].product.id).subscribe((image) => {
        this.carts[i].product.image = image;
        console.log(this.carts)
      })
    }
    console.log(this.carts);
  }, error => {
    console.log(error);
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
  private total(carts: CartItem[]){
    var result = 0;
    for(let i = 0; i <  carts.length; i++){
      result += (carts[i].quantity * carts[i].product.price);
    }
    return result;
  }
}
