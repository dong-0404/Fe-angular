import { Customer } from './../customer.interface';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit{

  customerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    if(this.customerForm.invalid) {
      return;
    }

    const customerData = this.customerForm.value;
    this.customerService.createCustomer(customerData)
    .subscribe((response:any) => {
      console.log(response);
    }),
    this.router.navigate(['/Admin/Customer']);
  }

}
