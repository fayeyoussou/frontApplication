import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Config } from '../class/config';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  headers = Config.HEADER
  url = Config.urlCategorie
  constructor(private http:HttpClient) {}
  addCategory(data : AbstractControl){
    return this.http.post(Config.urlCategorie,data,this.headers)
  }
  getCategories(){
    return this.http.get(Config.urlCategorie,this.headers)
  }
  deleteCategorie(id:number){
    return this.http.delete(this.url+id,this.headers)
  }
  updateCategorie(id:number,data : AbstractControl){
    return this.http.put(this.url+id,data,this.headers)
  }
}
