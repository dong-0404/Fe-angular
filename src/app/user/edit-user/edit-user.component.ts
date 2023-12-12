import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userForm: FormGroup;
  updateUser: User | undefined;

  constructor(private route: ActivatedRoute,
     private userService: UserService,
      private router: Router,
      private fb : FormBuilder ) {
        this.userForm = this.fb.group({
          name: ['',[ Validators.required,  Validators.minLength(2)]],
          email: ['', [Validators.required, Validators.email]]
        });
      }

  ngOnInit(): void {
   this.route.paramMap.subscribe(params => {
    const userId = parseInt(params.get('id') || '', 10);
    if(!isNaN(userId)) {
      this.userService.getUserById(userId).subscribe(user=> {
        this.updateUser = user;
        this.userForm.patchValue(user);
      })
    }
   })
  }

  onSubmit() : void {
    if(this.userForm.invalid) {
      return;
    }
    const updateUserData = this.userForm.value;

    this.userService.updateUser(this.updateUser!.id, updateUserData).subscribe(response => {
      console.log(response);
      // chuyen huong
      this.router.navigate(['/View-user', this.updateUser!.id]);
    })
  }
}
