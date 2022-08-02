import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../model/product";
import {ProductService} from "../../../service/product.service";
import {CategoryService} from "../../../service/category.service";
import {Category} from "../../../model/category";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-by-category',
  templateUrl: './product-by-category.component.html',
  styleUrls: ['./product-by-category.component.css']
})
export class ProductByCategoryComponent implements OnInit {

  products: Product[] | any;
  id: any

  listCategory: any;
  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      const id = param.get('id');
      this.findById(id);
      this.getAllProduct()
    })
  }
  searchCategory(id: any) {
    // const id = this.productForm.value.categoryId;
    this.productService.findProductByCategories(id).subscribe(data => {
      // @ts-ignore
      this.products = data;
      console.log(data);
    });
  }

  findById(id: any) {
    this.categoryService.findById(id).subscribe((data) => {
      this.listCategory = data;
      console.log(data)
      this.searchCategory(id)
    })
  }
  getAllProduct() {
    this.productService.getAll().subscribe(data => {
      // @ts-ignore
      this.products = data;
      console.log(data);
    }, error => {
      console.log(error);
    })
  }
}
