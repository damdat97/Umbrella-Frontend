import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../service/product.service";
import {ImageService} from "../../../service/image.service";

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  products: any[] = [];
  id = localStorage.getItem("ID")
  image: any;

  constructor(private productService: ProductService,
              private imageService: ImageService) {
  }

  ngOnInit(): void {
    this.findProductByUserId(this.id)
  }

  findProductByUserId(id: any) {
    this.image = []
    this.productService.findProductByUserId(id).subscribe((data) => {
      this.products = data;
      console.log("cua hang",data);
      for (let i = 0; i < data.length; i++) {
        this.imageService.findAllByProductId(data[i].id).subscribe((image) => {
          this.products[i].image = image;
          console.log(this.products)
        })
      }
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
