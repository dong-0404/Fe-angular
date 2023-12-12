import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/user/user.interface';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class EditUserProfileComponent implements OnInit {

  userProfileForm: FormGroup;
  updateUserProfile: User | undefined;


  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.userProfileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  ngOnInit(): void {
    const userId = this.authService.getId();
    if (this.authService.isLoggedIn() && userId) {
      this.authService.getUserInfo().subscribe(
        (userProfile: User) => {
          this.updateUserProfile = userProfile;
          this.userProfileForm.patchValue({
            name: userProfile.username,
            email: userProfile.email
          });
        },
        (error) => {
          console.error('Error fetching user profile:', error);
        }
      );
    }
  }
  onSubmit() {
    const userId = this.authService.getId();
    const idNumber = userId ? parseInt(userId) : 0;
    if (userId && this.userProfileForm.valid) {
      const profileData = {
        name: this.userProfileForm.value.name,
        email: this.userProfileForm.value.email
      };
      // if(this.authService.isLoggedIn() && userId) {
      this.authService.updateUserProfile(idNumber, profileData)
        .subscribe(
          (response) => {
            // Update successful, you can perform any additional actions
            console.log('Profile updated successfully:', response);
            // Redirect the user back to the user profile page
            this.router.navigate(['/user-profile']);
          },
          (error) => {
            console.error('Error updating user profile:', error);
          }
        );
      // }
    }
  }
  }
