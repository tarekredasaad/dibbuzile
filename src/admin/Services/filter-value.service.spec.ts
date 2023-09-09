import { TestBed } from '@angular/core/testing';

import { FilterValueService } from './filter-value.service';

describe('FilterValueService', () => {
  let service: FilterValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
