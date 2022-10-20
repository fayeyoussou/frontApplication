import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Config } from '../class/config';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("access_token") });
  constructor(private http:HttpClient) { }
  signup(data:any){
    return this.http.post(Config.url+'register',data);
  }
  login(data:any){
    return this.http.post(Config.url+'login',data);
  }
  logout(){
    return this.http.post(Config.url+"logout","",{ headers: this.headers })
  }
  getCategory(){
    console.log(localStorage.getItem("access_token"))
    return this.http.get(Config.urlCategorie,{ headers: this.headers });
  }
  getRoles(){
    // console.log(localStorage.getItem("access_token"))
    return this.http.get(Config.urlRole,{ headers: this.headers });
  }
  addUser(data:AbstractControl){
    return this.http.post(Config.urlUser,data,{ headers: this.headers });
  }
  updateUser(id:number,data:AbstractControl){
    return this.http.put(Config.urlUser+id,data,{ headers: this.headers })
  }
  getUsers(){
    return this.http.get(Config.urlUser,{ headers: this.headers });
  }
  deleteUser(id:number){
    return this.http.delete(Config.urlUser+id,{ headers: this.headers });
  }
  getUser(){
    return this.http.get(Config.url+"get",{ headers: this.headers });
  }


}
