import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.interface';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User | undefined;
   
  constructor(
    private route: ActivatedRoute,
    private userService: UserService         
    ) {}
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const userId = parseInt(params.get('id') || '',10);
        if(!isNaN(userId)) {
          this.userService.getUserById(userId).subscribe(user => {
            this.user = user;
          })
        }
      })

    }
}
