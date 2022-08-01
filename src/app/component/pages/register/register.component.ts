import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs";
import {AuthenticationService} from "../../../service/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    confirmPassword: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required])
  })

  get username() {
    return this.registerForm.get("username")
  }

  get password() {
    return this.registerForm.get("password")
  }

  get confirmPassword() {
    return this.registerForm.get("confirmPassword")
  }

  get phone() {
    return this.registerForm.get("phone")
  }

  constructor(private authenticationService : AuthenticationService, private router : Router) { }

  ngOnInit(): void {
  }

  register() {
    this.authenticationService.register(<string>this.registerForm.value.username, <string>this.registerForm.value.password,
      <string>this.registerForm.value.confirmPassword, <string>this.registerForm.value.phone).pipe(first()).subscribe(data => {
        // @ts-ignore
      $("#exampleModal").modal("show")
    }, error => {
      console.log(error)
    })
  }

  switchToLogin() {
    this.router.navigate(["/login"])
  }
}
