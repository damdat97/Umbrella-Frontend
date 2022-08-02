import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../service/authentication.service";
import {CategoryService} from "../../../service/category.service";
import {ProductService} from "../../../service/product.service";
import {Category} from "../../../model/category";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  categories: Category[] = [];

  constructor(private authenticationService: AuthenticationService,
              private categoryService: CategoryService,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((data) => {
      console.log(data);
      this.categories=data;
    })
    // this.getAllProduct()
  }
  searchCategory(id: any) {
    // const id = this.productForm.value.categoryId;
    this.productService.findProductByCategories(id).subscribe(data => {
      // @ts-ignore
      this.products = data;
      console.log(data);
    });
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
