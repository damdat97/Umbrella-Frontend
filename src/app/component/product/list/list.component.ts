import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductService} from "../../../service/product.service";
import {Product} from "../../../model/product";
import {FormControl, FormGroup} from "@angular/forms";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  products: Product[] | any;

  p: number = 1;
  total: number = 0;

  // @ts-ignore
  loading:boolean;


  cartProducts: any[] = [];
  product:FormGroup=new FormGroup({
    name:new FormControl('')
  })
  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    // this.getAllProduct()
    this.getProduct()
  }

  // getAllProduct() {
  //   this.productService.getAll().subscribe(data => {
  //     this.products = data;
  //     console.log(data);
  //   }, error => {
  //     console.log(error);
  //   })
  // }


  getProduct(){
    // @ts-ignore
    this.productService.getAllProduct(this.p)
      .subscribe((data:any) => {
        // @ts-ignore
        this.products = data;
        console.log(data);
        // @ts-ignore
        this.total = data.total;
      });
  }
  pageChangeEvent(event: number){
    this.p = event;
    this.getProduct();
  }


  // // @ts-ignore
  // private getListRequest(request) {
  //   this.loading = true;
  //   this.productService.getAllPro(request).subscribe(data => {
  //     // @ts-ignore
  //     this.products = data['content'];
  //     // @ts-ignore
  //     this.total = data['totalElements'];
  //     this.loading = false;
  //   }, error => {
  //     this.loading = false;
  //   });
  // }
  //
  // nextPage(event: PageEvent) {
  //   const request = {};
  //   // @ts-ignore
  //   request['page'] = event.pageIndex.toString();
  //   // @ts-ignore
  //   request['size'] = event.pageSize.toString();
  //   this.getListRequest(request);
  //
  //   // this.getSearchRequest(request,this.name);
  // }

  searchByName() {
    const name = this.product.value.name;
    this.productService.searchByName(name).subscribe((data) => {
      console.log(data)
      this.products = data;
    }, error => {
      console.log(error)
    })
  }
  addToCart(event: any) {
    console.log(event)
   if ("cart" in localStorage){
     this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
     let exist = this.cartProducts.find(item => item.id == event.id)
     if (exist) {
       alert("Product is already in you cart")
     } else {
       this.cartProducts.push(event)
       localStorage.setItem("cart", JSON.stringify(this.cartProducts))
     }
   } else {
     this.cartProducts.push(event)
     localStorage.setItem("cart", JSON.stringify(this.cartProducts))
   }
  }
}
