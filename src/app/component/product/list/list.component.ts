import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductService} from "../../../service/product.service";
import {Product} from "../../../model/product";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  products: Product[] | any;

  cartProducts: any[] = [];
  product:FormGroup=new FormGroup({
    name:new FormControl('')
  })
  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getAllProduct()
  }

  getAllProduct() {
    this.productService.getAll().subscribe(data => {
      this.products = data;
      console.log(data);
    }, error => {
      console.log(error);
    })
  }
  searchByName() {
    const name = this.product.value.name;
    this.productService.searchByName(name).subscribe((data) => {
      console.log(data)
      this.products = data;
    }, error => {
      console.log(error)
    })
  }
  addToCart(event: any) {
    console.log(event)
   if ("cart" in localStorage){
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
