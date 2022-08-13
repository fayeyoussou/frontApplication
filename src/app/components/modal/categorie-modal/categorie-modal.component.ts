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
import { CategorieService } from 'src/app/services/categorie.service';
@Component({
  selector: 'app-categorie-modal',
  templateUrl: './categorie-modal.component.html',
  styleUrls: ['./categorie-modal.component.scss']
})
export class CategorieModalComponent implements OnInit {

  error = {
    nom : ""
  }
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private api: CategorieService,
    private dialogRef: MatDialogRef<CategorieModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    var haveData = this.data != null;

    this.form = this.fb.group({
      // roles: this.fb.array([]),
      // prenom: [haveData ? this.data.prenom : '', Validators.required],
      nom: [haveData ? this.data.nom : '', Validators.required],
      // email: [haveData ? this.data.email : '', Validators.email],
      // password : [""],
      // confirmation : [""]
    });
  }
  submitForm(){
    if(this.form.valid){
      if(this.data == null) {
      this.api.addCategory(this.form.value).subscribe({
        next: (result:any) => {
          console.log(result)
          if(result.success ==true)
          this.dialogRef.close(result.success);
          else this.error = result.data
        }
      })} else {
        this.api.updateCategorie(this.data.id,this.form.value).subscribe(
          {
            next: (result:any) => {
              console.log(result)
              if(result.success ==true)
              this.dialogRef.close(result.success);
              else this.error = result.data
            }
          }
        )
      }
    }
  }

}
