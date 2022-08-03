import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../model/product";
import {ProductService} from "../../../service/product.service";
import {CategoryService} from "../../../service/category.service";
import {Category} from "../../../model/category";
import {ActivatedRoute} from "@angular/router";
import {ImageService} from "../../../service/image.service";

@Component({
  selector: 'app-product-by-category',
  templateUrl: './product-by-category.component.html',
  styleUrls: ['./product-by-category.component.css']
})
export class ProductByCategoryComponent implements OnInit {
  productByCate: Product[] | any;
  id: any
  image: any;
  listCategory: any;
  userId = localStorage.getItem("ID")

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private imageService: ImageService,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      const id = param.get('id');
      this.findById(id);
    })
  }

  searchCategory(id: any) {
    this.image = []
    this.productService.findProductByCategories(id).subscribe((data) => {
      this.productByCate = data
      console.log("1", data)
      for (let i = 0; i < data.length; i++) {
        this.imageService.findAllByProductId(data[i].id).subscribe((image) => {
          this.productByCate[i].image = image;
          console.log(this.productByCate)
        })
      }
    })
  }

  sortProductByQuantity(id: any) {
    this.productService.sortProductByQuantity(id).subscribe((data) => {
      this.productByCate = data
      console.log(data)
    })
  }

  findById(id: any) {
    this.categoryService.findById(id).subscribe((data) => {
      this.listCategory = data;
      this.searchCategory(id)
    })
  }
  getAllProduct() {
    this.image = []
    this.productService.getAll().subscribe((data) => {
      this.productByCate = data
      console.log("1", data)
      for (let i = 0; i < data.length; i++) {
        this.imageService.findAllByProductId(data[i].id).subscribe((image) => {
          this.productByCate[i].image = image;
          console.log(this.productByCate)
        })
      }
    }, error => {
      console.log(error);
    })
  }
  deleteProduct(id: any) {
    if (confirm('Are you sure you want to delete?')) {
      this.productService.delete(id).subscribe(() => {
        alert("Ok");
        this.getAllProduct()
      }, e => {
        console.log(e);
      });
    }
  }
}
