import { Injectable } from '@angular/core';
import { Product } from './product/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] =[
    { id: 1, name: 'Sản phẩm 1', category_id: 1, image: 'url-to-image-1', description: 'Mô tả sản phẩm 1', price: 100000 },
    { id: 2, name: 'Sản phẩm 2', category_id: 1, image: 'url-to-image-2', description: 'Mô tả sản phẩm 2', price: 150000 },
    { id: 1, name: 'Sản phẩm 1', category_id: 1, image: 'url-to-image-1', description: 'Mô tả sản phẩm 1', price: 100000 },
    { id: 2, name: 'Sản phẩm 2', category_id: 1, image: 'url-to-image-2', description: 'Mô tả sản phẩm 2', price: 150000 },
    { id: 1, name: 'Sản phẩm 1', category_id: 1, image: 'url-to-image-1', description: 'Mô tả sản phẩm 1', price: 100000 },
    { id: 2, name: 'Sản phẩm 2', category_id: 1, image: 'url-to-image-2', description: 'Mô tả sản phẩm 2', price: 150000 },
    { id: 1, name: 'Sản phẩm 1', category_id: 1, image: 'url-to-image-1', description: 'Mô tả sản phẩm 1', price: 100000 },
    { id: 2, name: 'Sản phẩm 2', category_id: 1, image: 'url-to-image-2', description: 'Mô tả sản phẩm 2', price: 150000 },
    { id: 1, name: 'Sản phẩm 1', category_id: 1, image: 'url-to-image-1', description: 'Mô tả sản phẩm 1', price: 100000 },
    { id: 2, name: 'Sản phẩm 2', category_id: 1, image: 'url-to-image-2', description: 'Mô tả sản phẩm 2', price: 150000 },
  ];

  getProducts(): Product[] {
    return this.products;
  }

  addProduct(product:Product): void {
    this.products.push(product);
  }

  createProduct(newProduct: Product): void {
    this.products = [...this.products, newProduct];
  }
  constructor() { }
}
