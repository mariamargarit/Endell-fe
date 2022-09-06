import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAttributeValuesDialogComponent } from './admin-attribute-values-dialog.component';

describe('AdminAttributeValuesDialogComponent', () => {
  let component: AdminAttributeValuesDialogComponent;
  let fixture: ComponentFixture<AdminAttributeValuesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAttributeValuesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAttributeValuesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
