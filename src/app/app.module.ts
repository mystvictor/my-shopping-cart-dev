import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
//import { DataTableModule } from 'angular-4-data-table';
import { DataTableModule } from 'angular-4-data-table/src/index';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FilterComponent } from './components/filter/filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccesComponent } from './components/order-succes/order-succes.component';
import { OrderFailedComponent } from './components/order-failed/order-failed.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { ProductFormComponent } from './components/admin/product-form/product-form.component';
import { ProductDatatableComponent } from './components/admin/product-datatable/product-datatable.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { ProductComponent } from './components/product/product.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { UserFormComponent } from './components/admin/user-form/user-form.component';

import { AuthService } from './shared/security/auth.service';
import { AuthGuard } from './shared/security/auth.guard';
import { AdminGuard } from './shared/security/admin.guard';
import { UserService } from './shared/security/user.service';
import { CategoryService } from './shared/services/category.service';
import { ProductService } from './shared/services/product.service';
import { CartService } from './shared/services/cart.service';
import { OrderService } from './shared/services/order.service';
import { AccountService } from './shared/services/account.service';

import { environment } from '../environments/environment';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { AdminOrderDetailsComponent } from './components/admin/admin-order-details/admin-order-details.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ProductsComponent,
    FilterComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccesComponent,
    OrderFailedComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    MyAccountComponent,
    ProductComponent,
    ProductQuantityComponent,
    ShippingFormComponent,
    ShoppingCartSummaryComponent,
    AdminUsersComponent,
    UserFormComponent,
    ProductDatatableComponent,
    OrderDetailComponent,
    AdminOrderDetailsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    DataTableModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminGuard,
    UserService,
    ProductService,
    CategoryService,
    CartService,
    OrderService,
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
