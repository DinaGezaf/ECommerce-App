import { LoginUserComponent } from './../../../Components/login-user/login-user.component';
import { UserRegisterComponent } from '../../../Components/user-register/user-register.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/Core/Service/auth.service';
import { Router } from '@angular/router';
import { AttentionsComponent } from '../../attentions/attentions.component';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css'],
})
export class NavbarUserComponent {
  products: any;
  isLogged!: boolean;
  token: any;
  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {
    this.token = this.authService.getToken();
    if (this.token) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  isLoggedIn() {
    this.token = this.authService.getToken();
    if (this.token) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
      const dialogRef = this.dialog.open(AttentionsComponent, {
        width: '300px',
        data: { message: 'Please log in to View Our Products.' },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
      });
    }
  }
  openEditor() {
    this.dialog.open(LoginUserComponent, {
      data: '',
      height: '70vh',
      width: '32vw',
    });
  }

  openRegisterUser() {
    this.dialog.open(UserRegisterComponent, {
      data: '',
      height: '70vh',
      width: '32vw',
    });
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
