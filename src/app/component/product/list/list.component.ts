import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductService} from "../../../service/product.service";
import {Product} from "../../../model/product";
import {ImageService} from "../../../service/image.service";
import {Category} from "../../../model/category";
import {User} from "../../../model/user";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  products: Product[] | any;
  cartProducts: any[] = [];
  image: any;
  userId = localStorage.getItem("ID")

  constructor(private productService: ProductService,
              private imageService: ImageService) {
  }

  ngOnInit(): void {
    this.getAllProduct()
  }

  getAllProduct() {
    this.image = []
    this.productService.getAll().subscribe((data) => {
      this.products = data
      console.log("1", data)
      for (let i = 0; i < data.length; i++) {
        this.imageService.findAllByProductId(data[i].id).subscribe((image) => {
          this.products[i].image = image;
          console.log(this.products)
        })
      }
    }, error => {
      console.log(error);
    })
  }

  addToCart(event: any) {
    console.log(event)
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
      let exist = this.cartProducts.find(item => item.id == event.id)
      if (exist) {
        alert("Product is already in you cart")
      } else {
        this.cartProducts.push(event)
        localStorage.setItem("cart", JSON.stringify(this.cartProducts))
      }
    } else {
      this.cartProducts.push(event)
      localStorage.setItem("cart", JSON.stringify(this.cartProducts))
    }
  }
}
