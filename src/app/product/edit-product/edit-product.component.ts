import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.interface';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productForm!: FormGroup;
  updateProduct: Product | undefined;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute
    ) {
      this.productForm = this.fb.group({
        name: ['', [Validators.required], Validators.minLength(2)],
        category_id: [''],
        price: ['', [Validators.required]],
        description: ['', [Validators.required, Validators.maxLength(50)]],
      })
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = parseInt(params.get('id') || '', 10);
      if(!isNaN(productId)){
        this.productService.getProductById(productId).subscribe(product => {
          this.updateProduct = product;
          // update data in the form
          this.productForm.patchValue(product);
        })
      }
    })
  }
  onSubmit() {
    if(this.productForm.invalid) {
      return;
    }
    const updateProductData = this.productForm.value;

    this.productService.updateProduct(this.updateProduct!.id, updateProductData)
    .subscribe((response) => {
      console.log(response);
      this.router.navigate(['/Admin/products']);
    })
  }
}
