import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  users: any;
  constructor(private authService:AuthService,private route: ActivatedRoute,private router:Router) {
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
    this.authService.getUserInfo()
    .subscribe((users:any ) => {
      console.log(users);
      this.users = users;
    },
    (error) => {
      console.log(error);
    }
    )
  }
  }
  editUserProfile(userId: number) {
    this.router.navigate(['/user-profile', userId]);
  }
  changePassword() {
    this.router.navigate(['/Admin/changePassword']);
  }
}
