import { Component,OnInit } from '@angular/core';
import { Order } from '../Order.interface';
import { OrderService } from '../order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.css']
})
export class AddNewItemComponent implements OnInit {

  orderItemForm: FormGroup;


  constructor(private orderService:OrderService,private fb: FormBuilder) {
    this.orderItemForm = this.fb.group({
      order_id: ['',Validators.required],
      product_id: [null, Validators.required],
      quantity: [null, [Validators.required, Validators.min(1)]]
    });
  }


  ngOnInit(): void {
    
  }

  addProductToOrder() {
    if (this.orderItemForm.valid) {
      const formData = this.orderItemForm.value;
      console.log(formData);
      
      // Gửi formData lên server bằng service
      this.orderService.createNewItem(formData).subscribe(
        response => {
          // Xử lý response từ server nếu cần
          console.log(formData);
        },
        error => {
          // Xử lý lỗi nếu có
          console.error(error);
        }
      );
    }
  }
}
