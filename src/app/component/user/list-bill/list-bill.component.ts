import { Component, OnInit } from '@angular/core';
import {CartItem} from "../../../model/CartItem";
import {ShoppingCartService} from "../../../service/shopping-cart.service";

@Component({
  selector: 'app-list-bill',
  templateUrl: './list-bill.component.html',
  styleUrls: ['./list-bill.component.css']
})
export class ListBillComponent implements OnInit {
  carts: CartItem[] | any;
  userId = localStorage.getItem("ID")

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.getAllBillByOwner()
  }

  getAllBillByOwner() {
    this.cartService.findBillByOwnerId(this.userId).subscribe((data) => {
      this.carts = data;
      console.log(data)
    }, error => {
      console.log(error);
    })
  }

  acceptBill(id: any, cartItem: CartItem) {
    console.log(id)
    this.cartService.acceptBill(id, cartItem).subscribe((data) => {
      console.log(data)
      this.getAllBillByOwner()
    })
  }

  deleteBill(id, cartItem: CartItem) {
    console.log(id)
    this.cartService.deleteBill(id, cartItem).subscribe((data) => {
      console.log(data)
      this.getAllBillByOwner()
    })
  }
}
