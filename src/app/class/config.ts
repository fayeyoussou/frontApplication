import { HttpHeaders } from "@angular/common/http"

export class Config {
  static url : string = 'http://apitest.faye/api/'
  static urlProduit : string = 'http://apitest.faye/api/produit/'
  static urlCategorie : string = 'http://apitest.faye/api/categorie/'
  static urlUser : string = 'http://apitest.faye/api/user/'
  static urlRole : string = 'http://apitest.faye/api/role/'
  static urlMouvement : string = 'http://apitest.faye/api/mouvement/'
  static HEADER : any = {headers : new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("access_token") })};
}
