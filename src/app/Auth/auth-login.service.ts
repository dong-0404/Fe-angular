import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user/user.interface';
import { map, catchError, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {

  private isAuthenticated = false;
  private apiUrl = 'http://localhost:8000/api';

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http:HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
this.currentUserSubject = new BehaviorSubject<User>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string){
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password })
    .pipe(map(User => {
      // store user details jwt token in localStorage
      localStorage.setItem('currentUser', JSON.stringify(User));
      this.currentUserSubject.next(User);
      return User;
    }));
  }

  logout() {
    //remove user from localStorage
    localStorage.removeItem('currentUser');
    // this.currentUserSubject.next(null);
  }
}
