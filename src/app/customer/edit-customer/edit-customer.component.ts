import { Component,OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  customerForm: FormGroup;
  updateCustomer: Customer | undefined;

  constructor(private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute) {
      this.customerForm = this.fb.group({
        name: ['',[ Validators.required,Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.minLength(10)]],
        address: ['', Validators.required]
      })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const customerId = parseInt(params.get('id') || '', 10);
      if(!isNaN(customerId)) {
        this.customerService.getCustomerById(customerId).subscribe(customer=> {
          this.updateCustomer = customer;
          this.customerForm.patchValue(customer);
        })
      }
    })
  }

  onSubmit() {
    if(this.customerForm.invalid) {
      return;
    }
    const updateCustomerData = this.customerForm.value;

    this.customerService.updateCustomer(this.updateCustomer!.id, updateCustomerData)
    .subscribe((respone) => {
      console.log(respone);
      this.router.navigate(['Customer']);
    })
  }

}
