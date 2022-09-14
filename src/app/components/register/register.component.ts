import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public succes_alert:boolean = false;

  public data:any = {
    email: '',
    nombre: '',
    pass: ''
  };

  constructor(private UserService: UserService) { }

  ngOnInit(): void {
    
  }

  OnSubmit(form: NgForm){
    console.log(JSON.stringify(this.data));

    try{
      this.UserService.Register(this.data).subscribe(res => {
        console.log(res);
        this.succes_alert = true;
      })
    }
    catch (error) {
      console.log("error");
    }

  }

}
