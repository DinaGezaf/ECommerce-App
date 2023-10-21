import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService<T> {
  constructor(private http: HttpClient) {}

  getAll(url: string): Observable<T[]> {
    return this.http.get<T[]>(url);
  }

  getOne(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  create(url: string, data: T): Observable<T> {
    return this.http.post<T>(url, data);
  }

  update(url: string, data: T): Observable<T> {
    return this.http.put<T>(url, data);
  }

  delete(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
