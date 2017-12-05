import { AppUser } from '../../shared/models/app-user';
import { OrderService } from '../../shared/services/order.service';
import { AuthService } from '../../shared/security/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { ShoppingCart } from '../../shared/models/shopping-cart';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Shipping } from '../../shared/models/shipping';
import { Order } from '../../shared/models/order';
import { UserService } from '../../shared/security/user.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('shopping-cart') shoppingCart: ShoppingCart
  shipping: Shipping = new Shipping;
  userSubscription: Subscription;
  appUserSubscription: Subscription;
  userKey: string;
  appUser: AppUser;

  constructor(private router: Router, private authService: AuthService, private orderService: OrderService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userKey = user.uid);
    this.appUserSubscription = this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  ngOnDestroy() { 
    this.userSubscription.unsubscribe();
    this.appUserSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userKey, this.appUser, this.shoppingCart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  } 

}
