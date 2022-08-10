import {Component, OnInit} from '@angular/core';
import {Product} from "../../../model/product";
import {ProductService} from "../../../service/product.service";
import {ImageService} from "../../../service/image.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../service/authentication.service";
import {NgToastService} from "ng-angular-popup";
import {ShoppingCartService} from "../../../service/shopping-cart.service";
import {User} from "../../../model/user";
import {CartItem} from "../../../model/CartItem";

@Component({
  selector: 'app-customer-shop',
  templateUrl: './customer-shop.component.html',
  styleUrls: ['./customer-shop.component.css']
})
export class CustomerShopComponent implements OnInit {
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
  user: any

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private imageService: ImageService,
              private toast: NgToastService,
              private shoppingCartService: ShoppingCartService,
              private router: Router,
              private authentication: AuthenticationService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      const id = param.get('id');
      this.findById(id);
    })
  }

  findById(id: any) {
    this.listImage = []
    this.authentication.findUserById(id).subscribe((data) => {
      this.user = data
      console.log(data)
      this.productService.findProductsByCustomerId(data.id, this.userId).subscribe((data) => {
        this.listProduct = data
        console.log("1", data)
        for (let i = 0; i < data.length; i++) {
          this.imageService.findAllByProductId(data[i].id).subscribe((image) => {
            this.listProduct[i].image = image;
          })
        }
      })
    })
  }

  pageChangeEvent(event: number) {
    this.p = event;
  }

  searchByAll() {
    this.listImage = []
    this.productService.searchByAll(this.product.value.name, this.product.value.description, this.product.value.from, this.product.value.to, this.userId).subscribe((data1) => {
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

  addCartForm = new FormGroup({
    quantity: new FormControl()
  })
  productAdd: any;
  shop: any

  addToShoppingCart(product: Product, shop: User) {
    if (this.userId == null) {
      // @ts-ignore
      $('#exampleModalAdd').modal('hide');
      this.toast.error({detail:"Lỗi", summary: "Cần đăng nhập để có thể mua hàng!", duration: 3000})
      this.router.navigate(['/login'])
    }
    else {
      // @ts-ignore
      const cartItem: CartItem = {
        shop: shop,
        product: product,
        quantity: this.addCartForm.value.quantity,
      }
      console.log(cartItem);
      this.shoppingCartService.save(cartItem).subscribe((data) => {
        // @ts-ignore
        $('#exampleModalAdd').modal('hide');
        console.log(data)
      })
      this.toast.success({detail: "Thành Công", summary: 'Thêm vào giỏ hàng thành công!', duration: 3000})
    }
  }

  findByIdProduct(id) {
    console.log(id)
    this.productService.findById(id).subscribe((data) => {
      this.listProduct = data;
      console.log(data);
    })
  }
}
