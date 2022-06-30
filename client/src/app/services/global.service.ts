import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  userUrl = "http://localhost:3000/user"

  public isLogin : boolean = false

  constructor(private http : HttpClient) { }

  register(obj:any):Observable<any>{
    return this.http.post(`${this.userUrl}/register` , obj)
  }
  login(obj:any):Observable<any>{
    return this.http.post(`${this.userUrl}/login` , obj )
  }
  AuthMe():Observable<any>{
    const body = {
      "lang" : 2
   }
    return this.http.post(`${this.userUrl}/me` , body  )
  }
}
