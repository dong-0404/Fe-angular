import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { User } from '../user.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private toasrt:ToastrService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
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
    .subscribe((response) => {
      console.log(response);
      this.toasrt.success('Created Successfully', 'Notice!');
      setTimeout(()=> {
        location.reload();
      }, 2000);
    },
    (error) => {
      this.toasrt.error('Can not creat new user', 'Error');
      setTimeout(() => {
        location.reload();
      }, 2000);
    })
  }
}
