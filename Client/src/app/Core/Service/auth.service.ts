import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApiService } from './generic.service';
import { environment } from 'src/environment';
import { IUser } from '../Model/User.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: boolean = false;
  private readonly BaseUrl = environment.apiUrl + '/Account/';

  constructor(private apiService: ApiService<any>, private router: Router) {}

  login(email: string, password: string) {
    return this.apiService.create(`${this.BaseUrl}Login`, {
      email: email,
      password: password,
    });
  }

  registerAdmin(user: IUser) {
    return this.apiService.create(this.BaseUrl + 'RegisterAdmin', user);
  }
  registerUser(user: IUser) {
    return this.apiService.create(this.BaseUrl + 'RegisterUser', user);
  }
  logout() {
    this.router.navigate(['/']);
  }
  getLoggedInStatus() {
    return this.isLoggedIn;
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
