import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CreateCustomerComponent } from './customer/create-customer/create-customer.component';
import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './Auth/login/login.component';
import { UserProfileComponent } from './Auth/user-profile/user-profile.component';
import { AuthInterceptor } from './Auth/auth.interceptor';
import { EditUserProfileComponent } from './Auth/edit-user-profile/edit-user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    CreateUserComponent,
    UserDetailComponent,
    EditUserComponent,
    ProductListComponent,
    AddProductComponent,
    CustomerListComponent,
    CreateCustomerComponent,
    EditCustomerComponent,
    DashboardComponent,
    LoginComponent,
    UserProfileComponent,
    EditUserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
