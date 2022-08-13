import { Component, Inject, Injectable, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {

  errors = {
    email: '',
    prenom: '',
    nom: '',
    roles: '',
    password:'',
    confirmation : ''
  };
  roleString = [];
  roles: Array<any> = [];
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userService.getRoles().subscribe({
      next: (result: any) => {
        if (result.success == true) {
          result.data.forEach((role: any) => {
            this.roles.push({ name: role.nom, value: role.id });
          });
        }

        // this.error.password = result.data.password
      },
    });
  }
  onCheckChange(e: any) {
    console.log(e.source.value);
    const roles: FormArray = this.form.get('roles') as FormArray;
    if (e.checked) {
      roles.push(new FormControl(e.source.value));
    } else {
      var i = 0;
      roles.controls.forEach((item: any) => {
        if (item.value == e.source.value) {
          roles.removeAt(i);
        }
        i++;
      });
    }
  }

  ngOnInit(): void {
    var haveData = this.data != null;

    this.form = this.fb.group({
      roles: this.fb.array([],Validators.required),
      prenom: [haveData ? this.data.prenom : '', Validators.required],
      nom: [haveData ? this.data.nom : '', Validators.required],
      email: [haveData ? this.data.email : '',Validators.required],
      password : [""],
      confirmation : [""]
    });
    if(haveData){
      const roles: FormArray = this.form.get('roles') as FormArray;
      this.data.roles.forEach((role: any) => {
        roles.push(new FormControl(role.id))
      });
    }
    // this.data.roles.forEach(x=>this.roleString.push())
  }
  getRolesString(): Array<string> {
    var a = [] as Array<string>;
    if (this.data != null) {
      this.data.roles.forEach((role: { id: number; nom: string }) => {
        a.push(role.nom);
      });
    }
    return a;
  }
  submitForm() {
    if (this.form.valid) {
      if (this.data == null) {
        console.log(this.form.value);
        this.userService.addUser(this.form.value).subscribe({
          next: (result: any) => {
            if (result.success == true) {
              console.log(result.data);
              this.dialogRef.close('save');
            } else {
              this.errors = result.data;
            }
          },
        });
      } else {
        this.userService.updateUser(this.data.id,this.form.value).subscribe({
          next: (result: any) => {
            if (result.success == true) {
              console.log(result.data);
              this.dialogRef.close('save');
            } else {
              console.log(result)
              this.errors = result.data;
            }
          },
        });
      }
    }
  }
}
