import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/Service/auth.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css'],
})
export class LoginUserComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}
  login!: FormGroup;
  ngOnInit(): void {
    this.login = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.login.valid) {
      const { email, password } = this.login.value;
      this.authService
        .login(this.login.value.email, this.login.value.password)
        .subscribe(
          (response: any) => {
            this.authService.setToken(response.token);
            localStorage.setItem('role', response.role);
            if (response.role == 'Admin') {
              this.router.navigate(['/home']);
            } else if (response.role == 'User') {
              this.router.navigate(['/products']);
            }
            this.dialog.closeAll();
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }
}
