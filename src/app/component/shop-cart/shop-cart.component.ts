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
getAllCart(){
  this.cartService.getAllCart(this.userId).subscribe((data) => {
    console.log(data)
    this.carts = data;
    this.countProduct = this.carts.length;
    this.totalMoney = this.total(this.carts);
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
  delete(id:any){
    alert("xóa")
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

  upCountPr(i:any) {
    this.carts[i].quantity++
    this.totalMoney = this.total(this.carts);
    this.toast.success({detail: "Thành Công", summary: 'Tăng thành công!', duration: 3000})

  }

  // gọi api để giảm sản phẩm *** vd: const param: {cartItemId: ..., Count:... }
  downCountPr(i: any) {
    this.carts[i].quantity--;
    this.totalMoney = this.total(this.carts);
    this.toast.success({detail: "Thành Công", summary: 'Giảm Thành Công!', duration: 3000})

  }
  // gọi api để thực hiện thanh toán.
  checkOut() {
    alert("đã thanh toán giỏ hàng");
  }

  private total(carts: CartItem[]) {
    let result = 0;
    for (let i = 0; i < carts.length; i++) {
      result += (carts[i].quantity * carts[i].product.price);
    }
    return result;
  }
}
