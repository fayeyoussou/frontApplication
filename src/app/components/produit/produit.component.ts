import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProduitService } from 'src/app/services/produit.service';
import { ProduitModalComponent } from '../modal/produit-modal/produit-modal.component';
@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {

  displayedColumns: string[] = ['libelle', 'stock', 'categorie','user', 'Action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private api: ProduitService,
    private modalService: NgbModal,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllProduits()
  }

  openModal = (): void => {
    this.dialog
      .open(ProduitModalComponent, {
        width: '40%',
      })
      .afterClosed()
      .subscribe((val) => {
        this.getAllProduits();
      });
  };
  getAllProduits(){
    this.api.getProduits().subscribe({
      next : (result: any)=> {
        this.dataSource = new MatTableDataSource(result.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editProduit(row:any){
    this.dialog
      .open(ProduitModalComponent, {
        width: '40%',
        data : row
      })
      .afterClosed()
      .subscribe((val) => {
        this.getAllProduits();
      });
  }
  deleteProduit(row:any){
    this.api.deleteProduit(row.id).subscribe({
      next:(result)=>{
        this.getAllProduits();
        
      }
    })
  }

}
