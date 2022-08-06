import {Component, OnInit} from '@angular/core';
import {Product} from "../../../../model/product";
import {ProductService} from "../../../../service/product.service";
import {ImageService} from "../../../../service/image.service";
import {NgToastService} from "ng-angular-popup";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {

  listProduct: Product[] | any;
  p: number = 1;
  total: number = 0;
  listImage: any;
  userId = localStorage.getItem("ID")
  product: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    from: new FormControl(''),
    to: new FormControl('')
  })

  constructor(private productService: ProductService,
              private imageService: ImageService,
              private toast: NgToastService) {
  }

  ngOnInit(): void {
    this.getAllProducts()
  }

  pageChangeEvent(event: number) {
    this.p = event;
  }

  getAllProducts() {
    this.listImage = []
    if(this.userId == localStorage.getItem("ID")){
      this.productService.findAllProductByUserIdNot(this.userId).subscribe((data) => {
        this.listProduct = data
        console.log("1", data)
        for (let i = 0; i < data.length; i++) {
          this.imageService.findAllByProductId(data[i].id).subscribe((image) => {
            this.listProduct[i].image = image;
            console.log(this.listProduct)
          })
        }

      })
    }
    if(this.userId != localStorage.getItem("ID") ||this.userId == null) {
      this.productService.getAll().subscribe((data) => {
        this.listProduct = data
        console.log("1", data)
        for (let i = 0; i < data.length; i++) {
          this.imageService.findAllByProductId(data[i].id).subscribe((image) => {
            this.listProduct[i].image = image;
            console.log(this.listProduct)
          })
        }
      })
    }
  }

  deleteProduct(id: any) {
    if (confirm('Bạn có muốn xóa sản phẩm này không ?')) {
      this.productService.delete(id).subscribe(() => {
        this.toast.success({detail: "Thành Công", summary: 'Xóa thành công!', duration: 3000})
        this.getAllProducts()
      }, e => {
        console.log(e);
      });
    }
  }

  searchByAll() {
    this.listImage = []
    this.productService.searchByAll(this.product.value.name, this.product.value.description, this.product.value.from, this.product.value.to).subscribe((data1) => {
      console.log(data1)
      this.listProduct = data1;
      for (let i = 0; i < data1.length; i++) {
        this.imageService.findAllByProductId(data1[i].id).subscribe((image) => {
          this.listProduct[i].image = image;
          console.log(this.listImage)
        })
      }
    }, error => {
      console.log(error)
    })
  }

  sortByAll(event: any) {
    if (event == 0) {
      return this.listProduct = this.listProduct.sort((obj1: any, obj2: any) => {
        if (obj1.name > obj2.name) {
          return 1;
        }

        if (obj1.name < obj2.name) {
          return -1;
        }

        return 0;
      });
    }
    if (event == 1) {
      return this.listProduct = this.listProduct.sort((obj1: any, obj2: any) => {
        if (obj1.quantity > obj2.quantity) {
          return 1;
        }

        if (obj1.quantity < obj2.quantity) {
          return -1;
        }

        return 0;
      });
    }
    if (event == 2) {

      this.listProduct = this.listProduct.sort((obj1: any, obj2: any) => {
        if (obj1.price > obj2.price) {
          return 1;
        }

        if (obj1.price < obj2.price) {
          return -1;
        }

        return 0;
      });
    }
  }


}
