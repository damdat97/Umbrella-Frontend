import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthenticationService} from "../../../service/authentication.service";
import {ProductService} from "../../../service/product.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin = false;
  name: any;
  id: any
  products: any

  @Input()
  searchName: FormGroup = new FormGroup({
    name: new FormControl('')
  })

  @Output()
  public searchEvent = new EventEmitter();

  constructor(private authenticationService: AuthenticationService,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.isLogin = localStorage.getItem("USERNAME") == null ? false : true;
    this.name = localStorage.getItem("NAME")
    this.id = localStorage.getItem("ID")
    this.findProductByUserId(this.id)
  }

  findProductByUserId(id: any) {
    this.productService.findProductByUserId(id).subscribe((data) => {
      this.products = data;
    })
  }

  logOut() {
    this.authenticationService.logout();
    this.isLogin = false;
  }

  search() {
    this.searchEvent.emit(this.searchName.value.name)
  }
}
