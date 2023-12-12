import { Component,OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../Order.interface';
import { PagingService } from 'src/app/paging.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order: Order[] = [];

  constructor(
    private orderService: OrderService,
    private toastr: ToastrService,
    private paging: PagingService,
    private route: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const OrderId = parseInt(params.get('id') || '', 10);
      if(!isNaN(OrderId)) {
        this.orderService.getOrdersItems(OrderId).subscribe(orders => {
          this.order = orders;
          console.log(this.order);
        })
      }
    })
  }
  DeleteOrderItem(id:number) {
    console.log(1);
    this.orderService.deleteOrdersItem(id)
    .subscribe(() => {
      this.order = this.order.filter(order => order.id !== id);
      this.toastr.success('deleted successfully', 'Notice');
    })
  }
  addProductToOrder() {
    
  }
  closeModal() {
    const myModal = document.getElementById('myModal');
    
    if (myModal !== null) {
      myModal.style.display = 'none';
    }
  }

  openModal(): void {
    const myModal = document.getElementById('myModal');
    
    if (myModal !== null) {
      myModal.style.display = 'block';
    }
  }

}
