
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/take';
import { CategoryService } from '../../../shared/services/category.service';
import { Product } from '../../../shared/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  key;
  product: Product = new Product();
  categories$;

  constructor(private categoryService: CategoryService, private productService: ProductService,
    private router: Router, private route: ActivatedRoute) { 
      this.key = this.route.snapshot.paramMap.get('id');
      if (this.key) this.productService.get(this.key).take(1).subscribe(p => this.product = p);
    }

  ngOnInit() {
    this.categories$ = this.categoryService.categories;
  }

  save(product) {
    if(this.key) this.productService.update(this.key, product);
    else this.productService.save(product);
    
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Voulez-vous supprimer ce produit?')) return;
    
        this.productService.delete(this.key);
        this.router.navigate(['/admin/products']);
  }

}
