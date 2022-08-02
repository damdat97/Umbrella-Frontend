import { Component, OnInit } from '@angular/core';
import {Product} from "../../../model/product";
import {ProductService} from "../../../service/product.service";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  newProduct: Product[] | any;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getNewProduct()
  }

  getNewProduct() {
    this.productService.findNewProduct().subscribe((data:any) => {
      this.newProduct = data;
      console.log(data);
    }, error => {
      console.log(error);
    })
  }



}
