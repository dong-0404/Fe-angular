import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';
import { User } from './user.interface';
import { PagingService } from '../paging.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit{
  user: User[] = [];

  currentPage = 1;
  lastPage = 1;
  constructor(
    private userService: UserService,
    private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    this.userService.getUsers(this.currentPage)
    .subscribe((users:any) => {
      this.user = users.data
      this.currentPage = users.current_page;
      this.lastPage = users.last_page;
      console.log(this.user);
    })
  }
  deleteUser(id:number): void {
    this.userService.deleteUser(id)
    .subscribe(() => {
      this.user = this.user.filter(user => user.id !== id);
      this.toastr.success('deleted successfully', 'Notice');
      console.log(this.user);
    });
  }
  prevPage():void {
    if(this.currentPage > 1) {
      this.currentPage--;
      this.ngOnInit();
    }
  }
  nextPage():void {
    if(this.currentPage < this.lastPage) {
      this.currentPage++;
      this.ngOnInit();
    }
  }
  openModal(): void {
    const myModal = document.getElementById('myModal');
    
    if (myModal !== null) {
      myModal.style.display = 'block';
    }
  }
  closeModal():void {
    const myModal = document.getElementById('myModal');
    
    if (myModal !== null) {
      myModal.style.display = 'none';
    }
  }
}
