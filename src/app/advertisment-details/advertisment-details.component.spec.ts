import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertismentDetailsComponent } from './advertisment-details.component';

describe('AdvertismentDetailsComponent', () => {
  let component: AdvertismentDetailsComponent;
  let fixture: ComponentFixture<AdvertismentDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvertismentDetailsComponent]
    });
    fixture = TestBed.createComponent(AdvertismentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
