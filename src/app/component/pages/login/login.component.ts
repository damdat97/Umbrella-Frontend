import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {first} from "rxjs";
import {AuthenticationService} from "../../../service/authentication.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  })

  constructor(private activatedRoute : ActivatedRoute, private router : Router,
              private authenticationService : AuthenticationService) { }

  ngOnInit(): void {
  }

  login() {
    this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password).pipe(first()).subscribe(data => {
      localStorage.setItem('ACCESS_TOKEN', data.accessToken);
      localStorage.setItem('ROLE', data.roles[0].authority);
      localStorage.setItem('USERNAME', data.username);
      localStorage.setItem('ID', data.id);
      if (data.roles[0].authority == "ROLE_USER") {
        alert("Dang nhap thanh cong")
        this.router.navigate(['']);
      }
      if (data.roles[0].authority == "ROLE_ADMIN") {
        alert("Dang nhap thanh cong")
        this.router.navigate(['/admin']);
      }
    }, error => {
      alert("Sai tài khoản hoặc mật khẩu!")
    })
  }
}
