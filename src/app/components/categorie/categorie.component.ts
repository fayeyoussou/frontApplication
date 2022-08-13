import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategorieModalComponent } from '../modal/categorie-modal/categorie-modal.component';
import { CategorieService } from 'src/app/services/categorie.service';
@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {

  displayedColumns: string[] = ['Id','Nom','Action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private api: CategorieService,
    private modalService: NgbModal,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllCategorie()
  }
  openModal = (): void => {
    this.dialog
      .open(CategorieModalComponent, {
        width: '40%',
      }).afterClosed()
      .subscribe((val) => {
        this.getAllCategorie();
      });
    //   .afterClosed()
    //   .subscribe((val) => {
    //     this.getAllUsers();
    //   });
  };
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAllCategorie(){
    this.api.getCategories().subscribe({
      next: (result: any) => {
        // console.log(result.data)
        this.dataSource = new MatTableDataSource(result.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }
  deleteCategorie(row:any){
    this.api.deleteCategorie(row.id).subscribe({
      next : (result :any)=>{
        if(result.success ==true) this.getAllCategorie()
        else alert( result.data)
      }
    })
  }
  editCategorie(row:any){
    this.dialog
      .open(CategorieModalComponent, {
        width: '40%',
        data : row
      }).afterClosed()
      .subscribe((val) => {
        this.getAllCategorie();
      });
  }

}
