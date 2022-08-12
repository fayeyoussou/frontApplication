import { UserService } from "../services/user.service";
import {Router} from "@angular/router"
export class Model {
  // private token : string |null = ""
  constructor(private userService : UserService,private router: Router) { }
  login(form : any) : any{
    this.userService
    .login(form)
    
  }
}
