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
import { ProduitService } from 'src/app/services/produit.service';
import { CategorieService } from 'src/app/services/categorie.service';
@Component({
  selector: 'app-produit-modal',
  templateUrl: './produit-modal.component.html',
  styleUrls: ['./produit-modal.component.scss'],
})
export class ProduitModalComponent implements OnInit {
  errors = {
    libelle: '',
    categorie_id: '',
    stock: '',
  };
  categories: Array<any> = [];

  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private api: ProduitService,
    private apiCategorie: CategorieService,
    private dialogRef: MatDialogRef<ProduitModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    var haveData = this.data != null;
    this.apiCategorie.getCategories().subscribe({
      next: (result: any) => {
        if (result.success == true) {
          result.data.forEach((categorie: any) => {
            this.categories.push({ name: categorie.nom, value: categorie.id });
          });
        }

        // this.error.password = result.data.password
      },
    });
    this.form = this.fb.group({
      libelle: [haveData ? this.data.libelle : '', Validators.required],
      categorie_id: [
        haveData ? this.data.categorie_id : '',
        Validators.required,
      ],
      stock: [haveData ? this.data.stock : 0],
    });
  }
  submitForm() {
    if (this.form.valid) {
      if (this.data == null) {
        this.api.addProduit(this.form.value).subscribe({
          next: (result: any) => {
            if (result.success == true) {
              this.dialogRef.close('added');
            } else this.errors = this.data
          },
        });
      } else {
        this.api.update(this.data.id,this.form.value).subscribe({
          next:(result:any)=>{
            // console.log(result)
            // console.log(this.data.id)
            if (result.success == true) {
              console.log(result.data)
              this.dialogRef.close('added');
            } else this.errors = this.data
          }
        })
        // console.log(this.data.id)
        // console.log(this.form.value)
      }
    }
  }
}
