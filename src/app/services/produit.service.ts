import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Config } from '../class/config';
import { AbstractControl } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  headers = Config.HEADER
  url = Config.urlProduit
  constructor(private http:HttpClient) { }
  getProduits(){
    return this.http.get(this.url,this.headers)
  }
  addProduit(data :AbstractControl){
    return this.http.post(this.url,data,this.headers)
  }
  update(id:number,data:AbstractControl){
    // console.log(this.url+id)
    return this.http.put(this.url+id,data,this.headers)
  }
  deleteProduit(id:number){
    return this.http.delete(this.url+id);
  }
}
