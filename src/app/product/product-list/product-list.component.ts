import { AddProductComponent } from './../add-product/add-product.component';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.interface';
import { ProductService } from 'src/app/product/product.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] =[];
  currentPage = 1;
  lastPage!:number;

  constructor(private productService: ProductService, private toasrt: ToastrService) {
  }
  
  ngOnInit(): void {
    this.productService.getProducts(this.currentPage)
    .subscribe((products:any) => {
      this.products = products.data;
      this.currentPage = products.current_page;
      // console.log(this.currentPage);
      this.lastPage = products.last_page;
      // console.log(this.lastPage);
      console.log(products);
    })
  }

  deleteProduct(id:number): void{
    if(confirm("Are you sure to delete")) {
    this.productService.deleteProduct(id)
    .subscribe(() =>{
      this.products = this.products.filter(product => product.id !==id);
      this.toasrt.success('Deleted Successfully', 'Notice');
      // console.log('Deleted successfully');
    })
  }
  }
  openModal(): void {
    const myModal = document.getElementById('myModal');
    
    if (myModal !== null) {
      myModal.style.display = 'block';
    }
  }
  
  closeModal():void {
    const myModal = document.getElementById('myModal');
    
    if (myModal !== null) {
      myModal.style.display = 'none';
    }
  }
  
  next(): void {
    if (this.currentPage < this.lastPage) {
      this.currentPage++;
      this.ngOnInit();
    }
  }
  previous(): void {
    if (this.currentPage > 1) {
      // this.goToPage(this.currentPage - 1);
      this.currentPage--;
      this.ngOnInit();
    }
  }
  
}
