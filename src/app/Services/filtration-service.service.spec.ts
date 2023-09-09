import { TestBed } from '@angular/core/testing';

import { FiltrationServiceService } from './filtration-service.service';

describe('FiltrationServiceService', () => {
  let service: FiltrationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltrationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
