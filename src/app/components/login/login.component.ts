import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { iif } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public data:any = {
    email: '',
    pass: ''
  };

  constructor(private UserService: UserService, private Router: Router) { }

  ngOnInit(): void {
  }

  OnSubmit(form: NgForm){
    console.log(JSON.stringify(this.data));

    try{
      this.UserService.Login(this.data).subscribe(res => {
        if(res.token){
        console.log(res);
        localStorage.setItem('token', res.token);
        this.Router.navigate(['/etiquetador'])
        //this.succes_alert = true;
      }
      })
    }
    catch (error) {
      console.log("error");
    }

  }

}
