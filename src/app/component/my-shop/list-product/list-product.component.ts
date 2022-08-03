import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../service/product.service";

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  products: any[] = [];
  id = localStorage.getItem("ID")

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.findProductByUserId(this.id)
  }

  findProductByUserId(id: any) {
    this.productService.findProductByUserId(id).subscribe((data) => {
      this.products = data;
      console.log("cua hang",data);
    },error => {
      console.log(error)
    })
  }

  deleteProduct(id: any) {
    if (confirm('Bạn chắc chắn muốn xóa sản phẩm này chứ ???')) {
      this.productService.delete(id).subscribe(() => {
        alert("Thành Công");
        this.findProductByUserId(id)
      }, e => {
        console.log(e);
      });
    }
  }

}
