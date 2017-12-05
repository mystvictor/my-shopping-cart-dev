import { Order } from '../../shared/models/order';
import { Observable } from 'rxjs/Rx';
import { OrderService } from '../../shared/services/order.service';
import { AuthService } from '../../shared/security/auth.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  subscription: Subscription;
  orders$: Observable<Order[]>;
  
  constructor(private auth: AuthService, private orderService: OrderService) { }

  ngOnInit() {
    this.orders$ = this.auth.user$.switchMap(u => this.orderService.getOrdersByUser(u.uid));
  }

}
