import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductAttributesComponent } from './admin-product-attributes.component';

describe('AdminProductAttributesComponent', () => {
  let component: AdminProductAttributesComponent;
  let fixture: ComponentFixture<AdminProductAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductAttributesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
