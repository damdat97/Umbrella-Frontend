import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {ShoppingCartService} from "../../service/shopping-cart.service";
import {CartItem} from "../../model/CartItem";
import {ImageService} from "../../service/image.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css']
})
export class ShopCartComponent implements OnInit {
  countProduct: number = 0;
  totalMoney: number = 0;
  totalQuantity1: number = 0;
  carts: CartItem[] | any;
  userId = localStorage.getItem("ID")
  id: any
  editCartForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    quantity: new FormControl('')
  })

  constructor(private productService: ProductService,
              private cartService: ShoppingCartService,
              private imageService: ImageService,
              private activatedRoute: ActivatedRoute,
              private toast: NgToastService) {
  }

  ngOnInit(): void {
    this.getAllCart();
    this.activatedRoute.paramMap.subscribe((param) => {
      const id = param.get('id');
      this.findById(id);
    })
  }

  getAllCart() {
    this.cartService.getAllCart(this.userId).subscribe((data) => {
      this.carts = data;
      this.countProduct = this.carts.length;
      this.totalMoney = this.total(this.carts);
      this.totalQuantity1= this.totalQuantity(this.carts)
      for (let i = 0; i < data.length; i++) {
        this.imageService.findAllByProductId(data[i].product.id).subscribe((image) => {
          this.carts[i].product.image = image;
          console.log(this.carts)
        })
      }
      console.log(this.carts);
    }, error => {
      console.log(error);
    })
  };

  delete(id: any) {
    if (confirm('Bạn có muốn xóa sản phẩm này không ?')) {
      this.cartService.remover(id).subscribe(() => {
        this.getAllCart();
        this.toast.success({detail: "Thành Công", summary: 'Xóa thành công!', duration: 3000})
      }, e => {
        console.log(e);
      });

    }
  }

  findById(id: any) {
    this.cartService.findById(id).subscribe((data) => {
      console.log(data);
      this.editCartForm = new FormGroup({
        id: new FormControl(data.id),
        quantity: new FormControl(data.quantity)
      })
    })
  }
  checkout() {
    this.cartService.checkout(this.userId).subscribe(res => {
      if (res.valueOf()) {
        this.toast.success({detail: "Thành Công", summary: 'Thanh toán thành công!', duration: 3000});
        // @ts-ignore
        $('#exampleModal-shop-cart').modal('hide');
      } else {
        this.toast.error({detail: "Thất bại", summary: 'Thanh toán thất bại', duration: 3000});
      }
    })
  }

  upCountPr(i: any) {
    this.carts[i].quantity++;
    this.cartService.updateCarItem(this.carts[i].id, this.carts[i]).subscribe(data => {
      if (data) {
this.getAllCart()
      } else {
        this.toast.success({detail: "Thất bại", summary: 'Tăng thất bại!', duration: 3000})
      }
    });
  }

  // gọi api để giảm sản phẩm *** vd: const param: {cartItemId: ..., Count:... }
  downCountPr(i: any) {
    if ((this.carts[i].quantity - 1) < 0) {
      return
    }
    this.carts[i].quantity--;
    this.cartService.updateCarItem(this.carts[i].id, this.carts[i]).subscribe(res => {
      if (res) {
        this.getAllCart()
      } else {
        this.toast.success({detail: "Thất bại", summary: 'Giảm thất bại!', duration: 3000})
      }
    });

  }


  private total(carts: CartItem[]) {
    let result = 0;
    for (let i = 0; i < carts.length; i++) {
      result += (carts[i].quantity * carts[i].product.price);
    }
    return result;
  }
  private totalQuantity(cart:CartItem[]){
    let count=0;
    for (let i=0;i<cart.length;i++){
      count+=cart[i].quantity;
    }
    return count;

  }
  goHome(){
    window.location.href="/"
}
}
