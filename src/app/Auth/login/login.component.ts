import { Component,OnInit } from '@angular/core';
import { AuthLoginService } from '../auth-login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  // selector: 'app-login',
  templateUrl: './login.component.html',
  // styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  email: string = '';
  password: string = '';

  constructor(private authLoginService: AuthLoginService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    ) {
      if (this.authLoginService.currentUserValue) {
        this.router.navigate(['/']);
      }
    }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    //get return url from router
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.f && this.f['email'] && this.f['password']) {
      this.authLoginService.login(this.f['email'].value, this.f['password'].value)
        .subscribe(
          user => {
            // Đăng nhập thành công, xử lý sau khi đăng nhập
          }
        );
    }
  }
  
}
