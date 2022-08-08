import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../service/authentication.service";
import {CategoryService} from "../../../service/category.service";
import {Category} from "../../../model/category";
import {Product} from "../../../model/product";
import {ProductService} from "../../../service/product.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin = false;
  username: any;
  id: any
  categories: Category[] = [];
  products: Product[]=[];

  constructor(private categoryService: CategoryService,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((data) => {
      this.categories=data;
    })
  }
  searchCategory(id: any) {
    this.productService.findProductByCategories(id).subscribe(data => {
      // @ts-ignore
      this.products = data;
    });
  }

  goHome() {
    window.location.href = '/';
  }
}
