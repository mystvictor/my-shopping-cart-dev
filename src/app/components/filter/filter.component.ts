import { Component, Input, OnInit } from '@angular/core';

import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input('category') category;
  categories$;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories$ = this.categoryService.categories;
  }

}
