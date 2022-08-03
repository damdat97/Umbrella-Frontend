import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductService} from "../../../service/product.service";
import {Product} from "../../../model/product";
import {ImageService} from "../../../service/image.service";
import {Category} from "../../../model/category";
import {User} from "../../../model/user";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  products: Product[] | any;

  p: number = 1;
  total: number = 0;


  cartProducts: any[] = [];
  image: any;
  userId = localStorage.getItem("ID")
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


  searchByAll() {
    this.productService.searchByAll( this.product.value.name, this.product.value.category_id,this.product.value.from, this.product.value.to).subscribe((data) => {
      console.log(data)
      this.products = data;
    }, error => {
      console.log(error)
    })
  }

  pageChangeEvent(event: number) {
    this.p = event;
    this.getAllProduct();
  }
}
