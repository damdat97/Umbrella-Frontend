import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../model/product";
import {ProductService} from "../../../service/product.service";
import {CategoryService} from "../../../service/category.service";
import {Category} from "../../../model/category";
import {ActivatedRoute, Router} from "@angular/router";
import {ImageService} from "../../../service/image.service";
import {FormControl, FormGroup} from "@angular/forms";
import {CartItem} from "../../../model/CartItem";
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';
import {NgToastService} from "ng-angular-popup";

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
  p: number = 1;
  total: number = 0;


  product: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    from: new FormControl(''),
    to: new FormControl('')
  })

  addCartForm = new FormGroup({
    quantity: new FormControl()
  })
  productCate: any;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private imageService: ImageService,
              private categoryService: CategoryService,
              private router:  Router,
              private shoppingCartService: ShoppingCartService,
              private toast: NgToastService) {}


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      const id = param.get('id');
      this.findById(id);
    })
  }

  searchCategory(id: any) {
    this.image = []
    if (this.userId == localStorage.getItem("ID")) {
      this.productService.findAllProductByCategoryAndUserIdNot(id, this.userId).subscribe((data) => {
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
    if (this.userId != localStorage.getItem("ID") || this.userId == null) {
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
  }

  findById(id: any) {
    this.categoryService.findById(id).subscribe((data) => {
      this.listCategory = data;
      this.searchCategory(id)
    })
  }

  pageChangeEvent(event: number) {
    this.p = event;
  }

  searchByAll() {
    this.image = []
    this.productService.searchByAll( this.product.value.name, this.product.value.description,this.product.value.from, this.product.value.to).subscribe((data1) => {
      console.log(data1)
      this.productByCate = data1;
      for (let i = 0; i < data1.length; i++) {
        this.imageService.findAllByProductId(data1[i].id).subscribe((image) => {
          this.productByCate[i].image = image;
          console.log(this.productByCate)
        })
      }
    }, error => {
      console.log(error)
    })
  }

  sortByAll(event: any) {
    if (event == 0) {
      return this.productByCate= this.productByCate.sort((obj1: any, obj2: any) => {
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
      return this.productByCate = this.productByCate.sort((obj1: any, obj2: any) => {
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

      this.productByCate = this.productByCate.sort((obj1: any, obj2: any) => {
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

  addToShoppingCart(product?: Product) {
    if (this.userId == null) {
      this.router.navigate(['/login'])
      this.toast.error({detail: "Lỗi", summary: "Cần đăng nhập để có thể mua hàng!", duration: 3000})
      window.location.href = "/login"
    } else {
      // @ts-ignore
      const cartItem: CartItem = {
        product: product,
        quantity: this.addCartForm.value.quantity,
      }
      console.log(cartItem);
      this.shoppingCartService.save(cartItem).subscribe((data) => {
        console.log(data)
        // @ts-ignore
        $('#exampleModalAdd').modal('hide');
      })
      this.toast.success({detail: "Thành Công", summary: 'Thêm vào giỏ hàng thành công!', duration: 3000})
    }
  }
  findByIdProduct(id) {
    console.log(id)
    this.productService.findById(id).subscribe((data) => {
      this.productByCate = data;
      console.log(data);
    })
  }
}
