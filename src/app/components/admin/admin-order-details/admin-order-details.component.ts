import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../shared/services/order.service';
import { Order } from '../../../shared/models/order';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-order-details',
  templateUrl: './admin-order-details.component.html',
  styleUrls: ['./admin-order-details.component.scss']
})
export class AdminOrderDetailsComponent implements OnInit {

  key;
  order: Order;

  constructor(private orderService: OrderService, private router: Router, private route: ActivatedRoute) { 
    this.key = this.route.snapshot.paramMap.get('id');
    if (this.key) this.orderService.get(this.key).take(1).subscribe(order => this.order = order);
  }

  ngOnInit() {
  }

  update() {
    this.order.delivered = true;
    this.orderService.update(this.key, this.order);
    this.router.navigate(['/admin/orders']);
  }
}
