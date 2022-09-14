import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OutputService {
  private BASE_URL_API: string = '';

  constructor(    private http: HttpClient   ) { 
    this.BASE_URL_API = "http://localhost:3000";
  }

  getOutputs(): Observable<any> {
    return this.http.get(this.BASE_URL_API + "/api/outputs");
  }

  createEtiqueta(data:any): Observable<any> {
    return this.http.post(this.BASE_URL_API + "/api/outputs/etiqueta", data);
  }
}
