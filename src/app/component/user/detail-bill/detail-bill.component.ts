import { Component, OnInit } from '@angular/core';
import {CartItem} from "../../../model/CartItem";
import {ShoppingCartService} from "../../../service/shopping-cart.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-detail-bill',
  templateUrl: './detail-bill.component.html',
  styleUrls: ['./detail-bill.component.css']
})
export class DetailBillComponent implements OnInit {
  carts: CartItem[] | any;
  userId = localStorage.getItem("ID")
  id: any

  constructor(private cartService: ShoppingCartService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      const id = param.get('id');
      this.findDetailBill(this.userId,id);
    })
  }

  findDetailBill(userId,id) {
    this.cartService.findDetailBill(this.userId,id).subscribe((data) => {
      this.carts = data;
      console.log(data)
    } , error => {
      console.log(error);
    } )
  }
}
