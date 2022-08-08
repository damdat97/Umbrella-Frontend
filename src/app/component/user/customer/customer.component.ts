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
}
