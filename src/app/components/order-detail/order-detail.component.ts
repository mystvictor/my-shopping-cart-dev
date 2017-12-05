import { OrderService } from '../../shared/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../shared/models/order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  key;
  order: Order;

  constructor(private orderService: OrderService, private router: Router, private route: ActivatedRoute) { 
    this.key = this.route.snapshot.paramMap.get('id');
    if (this.key) this.orderService.get(this.key).take(1).subscribe(order => this.order = order);
  }

  ngOnInit() {
    
  }

}
