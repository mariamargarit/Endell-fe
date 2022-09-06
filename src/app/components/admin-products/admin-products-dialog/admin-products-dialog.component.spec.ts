import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductsDialogComponent } from './admin-products-dialog.component';

describe('AdminProductsDialogComponent', () => {
  let component: AdminProductsDialogComponent;
  let fixture: ComponentFixture<AdminProductsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
