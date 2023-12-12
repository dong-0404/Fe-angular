import { Injectable } from '@angular/core';
import { Product } from './product.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

    createProducts(productData: any): Observable<Product> {
      return this.http.post<Product>(`${this.apiUrl}/addProducts`,productData);
    }

    getProducts(page: number):Observable<Product[]> {
      return this.http.get<Product[]>(`${this.apiUrl}/products?page=${page}`);
    }

    updateProduct(id:number, updateProductData:any):Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/product/${id}`,updateProductData);
    }

    deleteProduct(id:number): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/product/${id}`);
    }
    getProductById(id: number):Observable<any>{
      return this.http.get<any>(`${this.apiUrl}/product/${id}`);
    }

  
  
}
