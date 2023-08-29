import { AuthService } from './../Auth/auth.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private authService: AuthService) {

  }

  logout() {
    this.authService.logout();
  }
}
