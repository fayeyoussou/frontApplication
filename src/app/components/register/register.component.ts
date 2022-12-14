import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  displayedColumns: string[] = ['Nom Complet', 'Email', 'Roles', 'Action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  //subscribe(data=>console.log(data),error=>this.handleError(error));

  openModal = (): void => {
    this.dialog
      .open(UserModalComponent, {
        width: '40%',
      })
      .afterClosed()
      .subscribe((val) => {
        this.getAllUsers();
      });
  };
  editUser(row: any) {
    this.dialog
      .open(UserModalComponent, {
        width: '40%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        this.getAllUsers();
      });
  }
  deleteUser(row: any) {
    this.userService.deleteUser(row.id).subscribe({
      next: (result: any) => {
        // console.log(result.data)
        console.log(result);
        this.getAllUsers();
      },
    });
  }
  getAllUsers() {
    this.userService.getUsers().subscribe({
      next: (result: any) => {
        // console.log(result.data)
        this.dataSource = new MatTableDataSource(result.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
