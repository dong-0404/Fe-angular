import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.f["email"].value;
    const password = this.f["password"].value;

    this.authService.login(email, password)
      .subscribe(
        (res:any) => {
          this.authService.setToken(res.access_token);
          localStorage.setItem('id', res.user.id);
          const roles = res.user.role.map((role: any) => role.name);
          localStorage.setItem('userRoles', JSON.stringify(roles));
          this.authService.setUserRoles(roles);
          console.log(roles);
          if(roles.includes('manager') || roles.includes('employee')) {
            this.router.navigate(['Admin']);
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
