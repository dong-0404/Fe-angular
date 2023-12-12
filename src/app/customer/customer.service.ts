import { Injectable } from '@angular/core';
import { Customer } from './customer.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:8000/api';
  constructor(private http: HttpClient) { }

  getCustomers(page:number): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/Customer?page=${page}`);
  }
  createCustomer(customerData: any): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/createCustomer`, customerData);
  }

  updateCustomer(id: number, updateCustomerData:any): Observable<any> {
    return this.http.post<Customer>(`${this.apiUrl}/updateCustomer/${id}`, updateCustomerData);
  }
  deleteCustomer(id:number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteCustomer/${id}`);
  }
  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/Customer/show?id=${id}`);
  }
}
