import { Product } from '../../../shared/models/product';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-datatable',
  templateUrl: './product-datatable.component.html',
  styleUrls: ['./product-datatable.component.scss']
})
export class ProductDatatableComponent implements OnInit {

  @Input('product') product: Product;

  constructor() { }

  ngOnInit() {
  }

}
