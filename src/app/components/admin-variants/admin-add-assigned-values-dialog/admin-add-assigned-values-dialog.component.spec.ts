import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddAssignedValuesDialogComponent } from './admin-add-assigned-values-dialog.component';

describe('AdminAddAssignedValuesDialogComponent', () => {
  let component: AdminAddAssignedValuesDialogComponent;
  let fixture: ComponentFixture<AdminAddAssignedValuesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddAssignedValuesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddAssignedValuesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
