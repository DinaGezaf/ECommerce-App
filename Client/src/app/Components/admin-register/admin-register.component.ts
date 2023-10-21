import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/Service/auth.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css'],
})
export class AdminRegisterComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialogRef: MatDialogRef<any>
  ) {
    this.form = this.fb.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validator: this.matchingPasswords }
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { username, email, password } = this.form.value;
      this.authService.registerAdmin(this.form.value).subscribe(
        (response: any) => {
          this.dialogRef.close();
          this.router.navigate(['/']);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }

  matchingPasswords(group: FormGroup): null | { matching: boolean } {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { matching: true };
  }
}
