import { TestBed } from '@angular/core/testing';

import { SubcatgoryFiltersService } from './subcatgory-filters.service';

describe('SubcatgoryFiltersService', () => {
  let service: SubcatgoryFiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcatgoryFiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
