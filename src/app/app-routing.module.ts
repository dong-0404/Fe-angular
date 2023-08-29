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
      {path: "user-profile", component: UserProfileComponent},
      {path: "user-profile/:id", component:EditUserProfileComponent },

    ]

  },  
  // {path: "user-profile", component: UserProfileComponent},
  // {path: "user-profile/:id", component:EditUserProfileComponent },
  { path: "add-user", component: CreateUserComponent },
  { path: "View-user/:id", component: UserDetailComponent },
  { path: "user/:id", component: EditUserComponent },
  // {path: 'products', component: ProductListComponent},
  { path: 'products/add', component: AddProductComponent },
  // {path: '', redirectTo:'/products', pathMatch: 'full'},
  // { path: 'Customer', component: CustomerListComponent },
  { path: 'add-customer', component: CreateCustomerComponent },
  // {path: 'update-customer', component: EditCustomerComponent},
  { path: 'edit-customer/:id', component: EditCustomerComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
