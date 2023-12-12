import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/product/product.service';
import { Product } from '../product.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService:ProductService, private router:Router,private toasrt:ToastrService) {
    this.productForm = this.fb.group ({
     name: ['', Validators.required],
     category_id: [null, [Validators.required]],
     description: [''],
     price: [0, Validators.required],
    })
  }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    if(this.productForm.invalid) {
      return;
    }
    const productData = this.productForm.value;
    this.productService.createProducts(productData).subscribe(response => {
      console.log(response);
      this.toasrt.success('Created Successfully', 'Notice!');
      setTimeout(()=> {
        location.reload();
      }, 2000);
    }, 
    (error)=> {
      this.toasrt.error('Can not creat new user', 'Error!');
      setTimeout(() => {
        location.reload();
      }, 2000);
    })
    this.router.navigate(['/Admin/products']);
  }
  
}
