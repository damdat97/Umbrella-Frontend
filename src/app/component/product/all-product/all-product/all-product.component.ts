import {Component, OnInit} from '@angular/core';
import {Product} from "../../../../model/product";
import {ProductService} from "../../../../service/product.service";
import {ImageService} from "../../../../service/image.service";
import {NgToastService} from "ng-angular-popup";
import {FormControl, FormGroup} from "@angular/forms";
import {CartItem} from "../../../../model/CartItem";
import {ShoppingCartService} from "../../../../service/shopping-cart.service";
import {Router} from "@angular/router";
import {User} from "../../../../model/user";

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
              private toast: NgToastService,
              private shoppingCartService: ShoppingCartService,
              private router: Router) {
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


  findByIdProduct(id) {
    console.log(id)
    this.productService.findById(id).subscribe((data) => {
      this.listProduct = data;
      console.log(data);
    })
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

  addCartForm = new FormGroup({
    quantity: new FormControl()
  })
  pd: any;
  shop: User;


  addToShoppingCart(pd: Product, shop: User) {
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
        product: pd,
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




}
