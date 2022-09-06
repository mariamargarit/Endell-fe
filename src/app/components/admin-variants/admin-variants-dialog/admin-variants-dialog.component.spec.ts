import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVariantsDialogComponent } from './admin-variants-dialog.component';

describe('AdminVariantsDialogComponent', () => {
  let component: AdminVariantsDialogComponent;
  let fixture: ComponentFixture<AdminVariantsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVariantsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminVariantsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
