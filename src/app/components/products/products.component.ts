import { ShoppingCart } from '../../shared/models/shopping-cart';
import { Observable, Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filtered: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(private productService: ProductService, private cartService: CartService, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();    
    this.initProducts();
  }

  private initProducts() {
    this.productService.products
      .switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filtered = (this.category) ? this.products.filter(p => p.category === this.category) : this.products;
  }

}
