import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable } from 'rxjs';
import { User } from '../user/user.interface';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authToken: string = '';
  private userRoles: string[] = [];
  
  private apiUrl = 'http://localhost:8000/api/auth';
  private apiURL = 'http://localhost:800/api';


  constructor(private http:HttpClient,private router: Router) {
  }
  login(email: string, password: string):Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {
      email: email,
      password: password
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token'); // Kiểm tra sự tồn tại của token
  }

  setToken(token:string) {
     localStorage.setItem('access_token', token)
  }
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
  
  getId(): string | null {
    return localStorage.getItem('id');
  }

  logout() {
    localStorage.clear(); // Xoá toàn bộ thông tin đăng nhập trong localStorage
    this.userRoles = []; // Xóa thông tin role
    this.router.navigate(['/login']); // Chuyển hướng về trang đăng nhập
  }
  
  getUserInfo(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user-profile`);
  }

  updateUserProfile(id:number, profileData:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/updateUserProfile/${id}`, profileData);
  }
  changePassword(currentPassword:string, newPassword:string):Observable<any> {
    const data = {
      current_password: currentPassword,
      new_password: newPassword,
      new_password_confirmation: newPassword
    }
    return this.http.post(`${this.apiUrl}/changePassword`, data);
  }

  setUserRoles(roles: string[]) {
    this.userRoles = roles;
  }

  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }

  getUserRoles(): string[] {
    const roles = JSON.parse(localStorage.getItem('userRoles') || '[]');
    return roles;
  }
}
