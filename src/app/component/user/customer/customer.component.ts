import {Component, OnInit} from '@angular/core';
import {User} from "../../../model/user";
import {AuthenticationService} from "../../../service/authentication.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  users: User[] | any
  userId = localStorage.getItem("ID")
  phoneSearch: FormGroup = new FormGroup({
    phone: new FormControl('')
  })
  p: number = 1;
  total: number = 0;

  constructor(private authentication: AuthenticationService) {
  }

  ngOnInit(): void {
    this.getAllCustomersExpectUser()
  }

  getAllCustomersExpectUser() {
    this.authentication.findAllCustomersExpectUser(this.userId).subscribe((data) => {
      this.users = data
      console.log(this.users)
    })
  }


  searchPhone() {
    this.authentication.findCustomerByPhone(this.phoneSearch.value.phone, this.userId).subscribe((data) => {
      this.users = data
      console.log(this.users)
    })
  }

  sortByAll(event: any) {
    if (event == 0) {
      return this.users = this.users.sort((obj1: any, obj2: any) => {
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
      return this.users = this.users.sort((obj1: any, obj2: any) => {
        if (obj1.phone > obj2.phone) {
          return 1;
        }

        if (obj1.phone < obj2.phone) {
          return -1;
        }

        return 0;
      });
    }
  }

  pageChangeEvent(event: number) {
    this.p = event;
  }
}
