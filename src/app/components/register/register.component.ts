import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { UserModalComponent } from '../user-modal/user-modal.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public roles: any[] = [];
  public form = {
    prenom:null,
    nom:null,
    email :null,
    password :null,
    confirmation :null,
    roles : this.roles

  }

  constructor(private userService : UserService,private modalService: NgbModal,public dialog: MatDialog) { }

  public error :any = []
  ngOnInit(): void {
  }
  submitRegistration(){
    // console.log(this.form)
    return this.userService
    .signup(this.form)
    .subscribe({
      next: (data: any)=>console.log(data),
      error: (err : Error)=> console.log(err.message)
   });
    //subscribe(data=>console.log(data),error=>this.handleError(error));
  }
  openModal = (): void => {
    this.dialog.open(UserModalComponent, {
      width: '30%',

    });
    }
  handleError (error:any){
    this.error = error.error.errors;
  }

}
