import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubcategoriesDialogComponent } from './admin-subcategories-dialog.component';

describe('AdminSubcategoriesDialogComponent', () => {
  let component: AdminSubcategoriesDialogComponent;
  let fixture: ComponentFixture<AdminSubcategoriesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSubcategoriesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSubcategoriesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
