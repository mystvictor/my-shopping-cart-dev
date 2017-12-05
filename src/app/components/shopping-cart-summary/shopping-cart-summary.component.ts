import { ShoppingCart } from '../../shared/models/shopping-cart';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.scss']
})
export class ShoppingCartSummaryComponent implements OnInit {

  @Input('shopping-cart') shoppingCart: ShoppingCart;
  
  constructor() { }

  ngOnInit() {
  }

}
