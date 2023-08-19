import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { User } from '../user.interface';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  registrationSuccess: boolean = false // taoj trang thai dang ky

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    
  }
  onSubmit(): void {
    if(this.userForm.invalid) {
      return;
    }
    
    const userData = this.userForm.value;

    this.userService.createUser(userData)
    .subscribe(response => {
      console.log(response);
      this.registrationSuccess = true; // dang ki thanh cong
      setTimeout(()=> {
        this.registrationSuccess = false;
        location.reload();
      }, 2000);
    })
  }
}
