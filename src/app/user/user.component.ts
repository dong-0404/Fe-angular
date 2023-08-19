import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';
import { User } from './user.interface';
import { PagingService } from '../paging.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit{
  users: User[] = [];

  currentPage: number = 1;
  pageSize: number = 7;
  totalItems: number = 0;
  totalPages: number = 0;
  constructor(
    private userService: UserService,
    private pagingService: PagingService
    ) {}

  ngOnInit(): void {
    this.userService.getUsers()
    .subscribe(users => {
      console.log(users);
      this.users = users;
    })
  }
  deleteUser(id:number): void {
    this.userService.deleteUser(id)
    .subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
      console.log('User deleted successfully');
    });
  }
}
