import { AddNewItemComponent } from './order/add-new-item/add-new-item.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ChangePasswordComponent } from './Auth/change-password/change-password.component';
import { EditUserProfileComponent } from './Auth/edit-user-profile/edit-user-profile.component';
import { UserProfileComponent } from './Auth/user-profile/user-profile.component';
import { adminGuard } from './Auth/admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './Auth/login/login.component';
import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';
import { CreateCustomerComponent } from './customer/create-customer/create-customer.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { UserComponent } from './user/user.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './Auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'Admin', component: DashboardComponent,
    canActivate: [adminGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: "User", component: UserComponent },
      { path: "products", component: ProductListComponent },
      { path: 'Customer', component: CustomerListComponent },
      // {path: "user-profile", component: UserProfileComponent},
      // {path: "user-profile/:id", component:EditUserProfileComponent },
      {path: "changePassword", component:ChangePasswordComponent},
      {path: 'order', component:OrderListComponent},

    ]

  },  
  {path: "user-profile", component: UserProfileComponent},

  {path: "edit-product/:id", component: EditProductComponent},
  {path: "user-profile/:id", component:EditUserProfileComponent },
  { path: "add-user", component: CreateUserComponent,canActivate: [adminGuard] },
  { path: "View-user/:id", component: UserDetailComponent },
  { path: "user/:id", component: EditUserComponent },
  {path: 'Order/:id', component: OrderDetailComponent},
  
  {path: '', redirectTo:'/login', pathMatch: 'full'},
  // { path: 'Customer', component: CustomerListComponent },
  // { path: 'add-customer', component: CreateCustomerComponent,canActivate: [adminGuard]},
  // {path: 'update-customer', component: EditCustomerComponent},
  { path: 'edit-customer/:id', component: EditCustomerComponent },
  {path: 'createNewItem',component:AddNewItemComponent},
  // { path: "add-user", component: CreateUserComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
