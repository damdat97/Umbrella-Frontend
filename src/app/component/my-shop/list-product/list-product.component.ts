import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../service/product.service";
import {ImageService} from "../../../service/image.service";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  products: any[] = [];
  id = localStorage.getItem("ID")
  image: any;
  p: number = 1;
  total: number = 0;

  constructor(private productService: ProductService,
              private imageService: ImageService,
              private toast:NgToastService) {
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
        this.findProductByUserId(id)
        this.toast.success({detail: "Thành Công", summary: 'Xóa thành công!', duration: 3000})
      }, e => {
        console.log(e);
      });
    }
  }

  pageChangeEvent(event: number) {
    this.p = event;
  }
}
