import { TestBed } from '@angular/core/testing';

import { AdvertismentServiceService } from './advertisment-service.service';

describe('AdvertismentServiceService', () => {
  let service: AdvertismentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvertismentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
