import { CustomerService } from './../customer.service';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: Customer[] = [];
  currentPage!:number;
  lastPage!:number;
  constructor(private customerService: CustomerService, private router: Router, private toasrt:ToastrService 
  ) {

  }
  ngOnInit(): void {
    this.customerService.getCustomers(this.currentPage)
    .subscribe((customers:any) =>{
      this.customers = customers.data;
      this.currentPage = customers.current_page;
      this.lastPage = customers.last_page;
    });
  }

  navigateToAddCustomer() {
    this.router.navigate(['/add-customer']);
  }

  deleteCustomer(id: number): void {
    if(confirm("Are you sure to delete")){
    this.customerService.deleteCustomer(id)
    .subscribe(()=> {
      this.customers = this.customers.filter(customer => customer.id !== id);
      this.toasrt.success('Deleted Successfully', 'Notice!');
      // console.log('Deleted succesfully');
    })
  }
  }
  editCustomer(customerId: number): void {
    this.router.navigate(['update-customer', customerId]);
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
