import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/product.service';
import { Product } from '../product.interface';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService:ProductService) {
    this.productForm = this.fb.group ({
     name: ['', Validators.required],
     description: [''],
     price: [0, Validators.required],
    })
  }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    if(this.productForm.valid) {
      const newProduct: Product = this.productForm.value;
      this.productService.addProduct(newProduct);
      console.log('addProduct' +JSON.stringify(newProduct) );
      this.productForm.reset();
    }
  }
}
