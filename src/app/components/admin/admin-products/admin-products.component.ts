import { Subscription } from 'rxjs/Rx';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';

import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  products: Product[];
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.subscription = this.productService.products.subscribe(products => {
      this.products = products;
      this.initTable(products);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); 
  }

  filter(query: string) {
    let filtered = (query) ? this.products.filter(p => p.code.toLowerCase().includes(query.toLowerCase())) : this.products;
    this.initTable(filtered);
  }

  reloadItems(params) {
    if (!this.tableResource) return;

    this.tableResource.query(params)
      .then(items => this.items = items);  
  }

  private initTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);

    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);

    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

}
