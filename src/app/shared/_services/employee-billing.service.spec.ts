import { TestBed } from '@angular/core/testing';

import { EmployeeBillingService } from './employee-billing.service';

describe('EmployeeBillingService', () => {
  let service: EmployeeBillingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeBillingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
