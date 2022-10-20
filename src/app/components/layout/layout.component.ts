import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ResolveStart, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private api: UserService, private route: Router) {}

  user = {
    prenom: '',
    nom: '',
    roles: '',
  };
  ngOnInit(): void {
    this.api.getUser().subscribe({
      next: (result: any) => {
        if (result.success == true) {
          (this.user.prenom = result.data.prenom),
            (this.user.nom = result.data.nom);
          result.data.roles.forEach((element: any) => {
            this.user.roles += element.nom + ' ';
          });
        } else this.route.navigate(['/login']);
      },
    });
  }
  logout() {
    this.api.logout().subscribe({
      next: (result: any) => {
        if (result.success == true) {
          localStorage.removeItem('access_token');
          this.route.navigate(['/login']);
        }
      },
    });
  }
}
