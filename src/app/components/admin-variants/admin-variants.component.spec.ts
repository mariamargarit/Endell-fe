import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVariantsComponent } from './admin-variants.component';

describe('AdminVariantsComponent', () => {
  let component: AdminVariantsComponent;
  let fixture: ComponentFixture<AdminVariantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVariantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminVariantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
