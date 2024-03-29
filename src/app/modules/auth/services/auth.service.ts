import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL = environment.api

  constructor( private hhtp:HttpClient, private cookie:CookieService  ) { }

  sendCredentials( email:string, password:string ):Observable<any> {
    const body = { email, password }
    return  this.hhtp.post( `${this.URL}/auth/login`, body)
  }
}
