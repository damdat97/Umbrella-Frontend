import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../service/authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin = false;
  username: any;
  id: any
  constructor(private authenticationService : AuthenticationService) { }

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
