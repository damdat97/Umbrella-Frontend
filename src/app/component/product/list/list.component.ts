import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductService} from "../../../service/product.service";
import {Product} from "../../../model/product";
import {ImageService} from "../../../service/image.service";
import {Category} from "../../../model/category";
import {User} from "../../../model/user";
import {FormControl, FormGroup} from "@angular/forms";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  products: Product[] | any;
  cartProducts: any[] = [];
  image: any;
userId= localStorage.getItem("ID")

  constructor(private productService: ProductService,
              private imageService: ImageService,
              private toast: NgToastService) {
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

  deleteProduct(id: any) {
    if (confirm('Bạn có muốn xóa sản phẩm này không ?')) {
      this.productService.delete(id).subscribe(() => {
        this.toast.success({detail: "Thành Công", summary: 'Xóa thành công!', duration: 3000})
        this.getAllProduct()
      }, e => {
        console.log(e);
      });
    }
  }
}
