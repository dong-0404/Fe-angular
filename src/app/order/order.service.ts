import { Injectable } from '@angular/core';
import { Order } from './Order.interface';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  searchOrders(userId: string, customerId: string, orderId: string): Observable<any[]> {
    let params = new HttpParams();
    if (userId) {
      params = params.append('userId', userId);
    }
    if (customerId) {
      params = params.append('customerId', customerId);
    }
    if (orderId) {
      params = params.append('orderId', orderId);
    }

    return this.http.get<any[]>(`${this.apiUrl}/getOrder`, { params });
  }
  
  getOrders(page: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/Order?page=${page}`);

  }
  getOrdersItems(Order_id:number):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/OrderItem/${Order_id}`);
  }
  deleteOrdersItem(OrderItem_id:number):Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/DeleteOrderItem/${OrderItem_id}`);
  }

  createNewItem(data:any):Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/AddItem`,data);
  }
  deleteOrder(Order_id:number):Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Order/Delete/${Order_id}`);
  }
}
