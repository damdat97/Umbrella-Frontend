import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductService} from "../../../service/product.service";
import {Product} from "../../../model/product";
import {FormControl, FormGroup} from "@angular/forms";
import {PageEvent} from "@angular/material/paginator";
import {ImageService} from "../../../service/image.service";
import {Category} from "../../../model/category";
import {User} from "../../../model/user";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  products: Product[] = [];

  p: number = 1;
  total: number = 0;


  cartProducts: any[] = [];
  product: FormGroup = new FormGroup({
    name: new FormControl(''),
    category_id:new FormControl(''),
    from:new FormControl(''),
    to: new FormControl('')
  })

  constructor(private productService: ProductService,
              private imageService: ImageService) {
  }

  ngOnInit(): void {
    // this.getAllProduct()
    this.getAllProduct()
  }

  getAllProduct() {
    // @ts-ignore
    this.productService.getAll().subscribe((data: any) => {
      this.products = data;
      this.total = data.total;
      for (let i = 0; i < data.length; i++) {
        this.imageService.findAllByProductId(data[i].id).subscribe((x) => {
          this.products.push({
            id: data[i].id,
            name: data[i].name,
            description: data[i].description,
            price: data[i].price,
            quantity: data[i].quantity,
            category: data[i].category,
            owner: data[i].owner,
            // @ts-ignore
            images: x
          })

          console.log(this.products)
        })
      }
    })
  }


  pageChangeEvent(event: number) {
    this.p = event;
    this.getAllProduct();
  }


  // searchByName() {
  //   const name = this.product.value.name;
  //   this.productService.searchByName(name).subscribe((data) => {
  //     console.log(data)
  //     this.products = data;
  //   }, error => {
  //     console.log(error)
  //   })
  // }

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


  searchByAll() {
    this.productService.searchByAll( this.product.value.name, this.product.value.category_id,this.product.value.from, this.product.value.to).subscribe((data) => {
      console.log(data)
      this.products = data;
    }, error => {
      console.log(error)
    })

  }
}
