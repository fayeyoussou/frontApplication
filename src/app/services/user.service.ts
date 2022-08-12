import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Config } from '../class/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  signup(data:any){
    return this.http.post(Config.url+'register',data);
  }
  login(data:any){
    return this.http.post(Config.url+'login',data);
  }

}
