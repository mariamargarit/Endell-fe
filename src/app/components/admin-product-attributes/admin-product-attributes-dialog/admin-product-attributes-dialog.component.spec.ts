import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductAttributesDialogComponent } from './admin-product-attributes-dialog.component';

describe('AdminProductAttributesDialogComponent', () => {
  let component: AdminProductAttributesDialogComponent;
  let fixture: ComponentFixture<AdminProductAttributesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductAttributesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductAttributesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
