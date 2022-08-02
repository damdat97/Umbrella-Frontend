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
  products: any = [];

  cartProducts: any[] = [];

  constructor(private productService: ProductService,
              private imageService: ImageService) {
  }

  ngOnInit(): void {
    this.getAllProduct()
  }

  getAllProduct() {
    this.productService.getAll().subscribe(data => {
      for (let i =0; i<data.length; i++) {
        this.imageService.findAllByProductId(data[i].id).subscribe((x)=> {
          this.products.push({
            id: data[i].id,
            name:data[i].name,
            description: data[i].description,
            price: data[i].price,
            quantity: data[i].quantity,
            category: data[i].category,
            owner: data[i].owner,
            images: x
          })

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
}
