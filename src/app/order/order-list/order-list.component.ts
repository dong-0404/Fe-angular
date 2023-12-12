import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Order } from '../Order.interface';
import { OrderService } from '../order.service';
import { PagingService } from 'src/app/paging.service';
import { FormGroup, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  Orders: Order[] = [];
  userId: string = '';
  customerId: string = '';
  orderId: string = '';
  currentPage = 1;
  lastPage = 1;
  searchForm: FormGroup;

  constructor(
    private orderService:OrderService,
    private PagingService: PagingService,
    private toastr:ToastrService,
    private fb:FormBuilder
    ) {
      this.searchForm = this.fb.group({
        orderId: [''],
      userId: [''],
      customerId: ['']
      });
  }
  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders(this.currentPage).subscribe((Order:any) => {
      this.Orders = Order.data;
      // console.log(this.Orders);
      this.currentPage = Order.current_page;
      this.lastPage = Order.last_page;
      console.log(this.Orders);
    })
  }
    
    searchOrders() {
      this.orderService.searchOrders(this.userId, this.customerId, this.orderId)
        .subscribe((result) => {
          this.Orders = result;
        });
    }

  prevPage():void {
    if(this.currentPage > 1) {
      this.currentPage--;
      this.ngOnInit();
    }
  }
  nextPage():void {
    if(this.currentPage < this.lastPage) {
      this.currentPage++;
      this.ngOnInit();
    }
  }
  deleteOrder(id:number): void {
    this.orderService.deleteOrder(id)
    .subscribe(() => {
      this.Orders = this.Orders.filter(Orders => Orders.id !== id);
      this.toastr.success('deleted successfully', 'Notice');
      console.log(this.toastr);
    });
  }
}
