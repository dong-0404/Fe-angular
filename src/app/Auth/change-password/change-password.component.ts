import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm : FormGroup;
  errorMessage:string = '';
  successMessage!: string;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword:['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    
  }
  changePassword() {
    if(this.changePasswordForm.invalid) {
      return;
    }
    const currentPassword = this.changePasswordForm.get('currentPassword')?.value;
    const newPassword = this.changePasswordForm.get('newPassword')?.value;
    const confirmNewPassword = this.changePasswordForm.get('confirmNewPassword')?.value;

    if(newPassword!= confirmNewPassword) {
      return;
    }
    this.authService.changePassword(currentPassword, newPassword).subscribe((response) =>{
      if(response.message){
        this.successMessage = response.message
        console.log(response.message);
      }
      // console.log(response);

    },
    (error) => {
      // console.log(error);
      if (error.status === 401) {
        this.errorMessage = 'Current password is incorrect.';
      } else {
        this.errorMessage = 'An error occurred. Please try again later.';
      }
       console.log(error);

    });
  }
}
