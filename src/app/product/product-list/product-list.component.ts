import { Component, OnInit } from '@angular/core';
import { Product } from '../product.interface';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[]= [];

  constructor(private productService: ProductService) {}
  

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    
  }
}
