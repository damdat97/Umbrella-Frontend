import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../service/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin = false;
  username: any;
  id: any

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isLogin = localStorage.getItem("USERNAME") == null ? false : true;
    this.username = localStorage.getItem("USERNAME")
    this.id = localStorage.getItem("ID")
  }

  logOut() {
    this.authenticationService.logout();
    this.isLogin = false;
  }

}
