export class UserBase {
  id : number|null
  email: string|null
  password : string|null
  prenom : string|null
  nom : string|null
  roles : Array<any> |null
  constructor(data : any = null){
    this.email = data?.email;
    this.id = data?.id;
    this.password = data?.password
    this.prenom = data?.prenom
    this.roles =data?.roles
    this.nom = data?.nom
  }
 



}
