import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm! : FormGroup;

  constructor(private fb : FormBuilder
              ,private loginService : LoginService
              ,private router : Router) {

  }



  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username : this.fb.control("" , [Validators.required,Validators.email]),
      password : this.fb.control("", [Validators.required])
    });
  }

  handleLogin() {
    let username = this.loginForm.value.username;
    let password  = this.loginForm.value.password;
    this.loginService.login(username,password).subscribe({
      next : value=> {
        this.router.navigateByUrl('/admin');
        this.loginService.extractData(value);
      },error : err =>{
        console.log(err)
    }
    });
  }
}
