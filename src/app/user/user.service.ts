import { Injectable } from '@angular/core';
import { User } from './user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/User`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/showUser?id=${id}`);
  }

  createUser(userData: any): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/register`, userData);
  }

  updateUser(id:number, updateUserData:any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/updateUser/${id}`,updateUserData);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteUser/${id}`);
  }
}
