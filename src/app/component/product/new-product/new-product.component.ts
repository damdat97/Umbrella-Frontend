import { Component, OnInit } from '@angular/core';
import {Product} from "../../../model/product";
import {ProductService} from "../../../service/product.service";
import {ImageService} from "../../../service/image.service";
import {NgToastService} from "ng-angular-popup";
import {ShoppingCartService} from "../../../service/shopping-cart.service";
import {CartItem} from "../../../model/CartItem";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../../model/user";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  products: Product[] | any;
  image: any;
  userId = localStorage.getItem("ID")

  addCartForm = new FormGroup({
    quantity: new FormControl()
  })
  product: any;
  shop: User;

  constructor(private productService: ProductService,
              private imageService: ImageService,
              private toast: NgToastService,
              private shoppingCartService: ShoppingCartService,
              private router: Router) { }

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

  addToShoppingCart(product: Product, shop: User) {
    if (this.userId == null) {
      // @ts-ignore
      $('#exampleModalAdd').modal('hide');
      this.toast.error({detail:"Lỗi", summary: "Cần đăng nhập để có thể mua hàng!", duration: 3000})
      this.router.navigate(['/login'])
    }
    else {
      // @ts-ignore
      const cartItem: CartItem = {
        shop: shop,
        product: product,
        quantity: this.addCartForm.value.quantity,
      }
      console.log(cartItem);
      this.shoppingCartService.save(cartItem).subscribe((data) => {
        // @ts-ignore
        $('#exampleModalAdd').modal('hide');
        console.log(data)
      })
      this.toast.success({detail: "Thành Công", summary: 'Thêm vào giỏ hàng thành công!', duration: 3000})
    }
  }
  findByIdProduct(id) {
    console.log(id)
    this.productService.findById(id).subscribe((data) => {
      this.products = data;
      console.log(data);
    })
  }
}
