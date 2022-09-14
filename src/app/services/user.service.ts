import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL_API: string = '';
  //private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn')  || 'false');

  constructor(    private http: HttpClient, 
                  private jwtHelper: JwtHelperService) { 
    this.BASE_URL_API = "http://localhost:3000";
  }

  //setLoggedIn(value: boolean){
    //this.loggedInStatus = value;
    //localStorage.setItem('loggedIn', 'true');

  //}

  isAuth():boolean {
    if(localStorage.getItem('token')){
      const token = localStorage.getItem('token') || 'false';
      console.log('token', token);
      if( this.jwtHelper.isTokenExpired(token)){
        return false;
      }
      else{
        return true;
      }

    }
    else{
      return false;
    }
 
  }

  Register(data:any): Observable<any> {
    return this.http.post(this.BASE_URL_API + "/api/users/register", data);
  }

  Login(data:any): Observable<any> {  //getuserdetail
    return this.http.post(this.BASE_URL_API + "/api/users/login", data);
  }

  
  



}
