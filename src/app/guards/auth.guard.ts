import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterPreloader, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: UserService,
              private Router: Router){
    
  }
  canActivate():boolean{
    if(!this.authService.isAuth()){
      console.log('Token ya expiró');
      this.Router.navigate(['/login'])
      return false;
    }
    return true;
  }

  }
  

