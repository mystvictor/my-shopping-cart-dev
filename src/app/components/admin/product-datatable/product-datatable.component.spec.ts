import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDatatableComponent } from './product-datatable.component';

describe('ProductDatatableComponent', () => {
  let component: ProductDatatableComponent;
  let fixture: ComponentFixture<ProductDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
