import { Subscription } from 'rxjs/Rx';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {

  orders$;
  subscription: Subscription;
  orders: Order[];
  tableResource: DataTableResource<Order>;
  items: Order[] = [];
  itemCount: number;
  
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    //this.orders$ = this.orderService.orders();
    this.subscription = this.orderService.orders.subscribe(orders => {
      this.orders = orders;
      this.initTable(orders);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); 
  }

  filter(query: string) {
    let filtered = (query) ? this.orders.filter(o => o.customer.name.toLowerCase().includes(query.toLowerCase())) : this.orders;
    this.initTable(filtered);
  }

  reloadItems(params) {
    if (!this.tableResource) return;

    this.tableResource.query(params)
      .then(items => this.items = items);  
  }

  private initTable(orders: Order[]) {
    this.tableResource = new DataTableResource(orders);
    
        this.tableResource.query({ offset: 0 })
          .then(items => this.items = items);
    
        this.tableResource.count()
          .then(count => this.itemCount = count);
  }

}
