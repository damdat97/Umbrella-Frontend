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
  productByCate: any = [];
  id: any

  images: [] = []

  image: any;

  listCategory: any;
  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private imageService: ImageService,
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      const id = param.get('id');
      this.findById(id);
    })
  }
  searchCategory(id: any) {
    this.images = []
    // const id = this.productForm.value.categoryId;
    this.productService.findProductByCategories(id).subscribe((data) => {
      this.productByCate = data
      for (let i =0; i<data.length; i++) {
        this.imageService.findAllByProductId(data[i].id).subscribe((image)=> {
          data[i].image = image.image;
          console.log(this.productByCate)
        })
      }

          console.log(this.productByCate)
        })
      }

  findById(id: any) {
    this.categoryService.findById(id).subscribe((data) => {
      this.listCategory = data;
      console.log(data)
      this.searchCategory(id)
    })
  }

}
