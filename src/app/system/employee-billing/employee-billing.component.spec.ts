import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBillingComponent } from './employee-billing.component';

describe('EmployeeBillingComponent', () => {
  let component: EmployeeBillingComponent;
  let fixture: ComponentFixture<EmployeeBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeBillingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
