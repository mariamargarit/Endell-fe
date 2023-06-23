import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddValuesDialogComponent } from './admin-add-values-dialog.component';

describe('AdminAddValuesDialogComponent', () => {
  let component: AdminAddValuesDialogComponent;
  let fixture: ComponentFixture<AdminAddValuesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddValuesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddValuesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
