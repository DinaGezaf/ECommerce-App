import { Router } from '@angular/router';
import { Component } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { AuthService } from 'src/app/Core/Service/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent {
  form!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialogRef: MatDialogRef<any>
  ) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
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
