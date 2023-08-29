import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivateChild(): boolean {
    const userRoles = this.authService.getUserRoles();

    // Check if user has 'manager' role
    if (userRoles.includes('manager')) {
      return true;
    }

    // Redirect to unauthorized page for 'employee' role
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
