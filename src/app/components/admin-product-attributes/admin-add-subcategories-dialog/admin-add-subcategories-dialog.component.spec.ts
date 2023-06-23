import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddSubcategoriesDialogComponent } from './admin-add-subcategories-dialog.component';

describe('AdminAddSubcategoriesDialogComponent', () => {
  let component: AdminAddSubcategoriesDialogComponent;
  let fixture: ComponentFixture<AdminAddSubcategoriesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddSubcategoriesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddSubcategoriesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
