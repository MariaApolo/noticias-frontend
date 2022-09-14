import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  public isAuth: any; 

  constructor(private UserService: UserService) { }

  ngOnInit(): void {

    try{
    this.isAuth = this.UserService.isAuth();
    }
    catch(error){
      console.log("Error")
    }

  }

}
