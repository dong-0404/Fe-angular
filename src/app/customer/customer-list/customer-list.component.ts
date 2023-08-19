import { CustomerService } from './../customer.service';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: Customer[] = [];
  constructor(private customerService: CustomerService, private router: Router 
  ) {

  }
  ngOnInit(): void {
    this.customerService.getCustomers()
    .subscribe(customers =>{
      this.customers = customers;
    });
  }

  navigateToAddCustomer() {
    this.router.navigate(['/add-customer']);
  }

  deleteCustomer(id: number): void {
    this.customerService.deleteCustomer(id)
    .subscribe(()=> {
      this.customers = this.customers.filter(customer => customer.id !== id);
      console.log('Deleted succesfully');
    })
  }
  editCustomer(customerId: number): void {
    this.router.navigate(['update-customer', customerId]);
  }
}
