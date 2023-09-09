import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertismentUserComponent } from './advertisment-user.component';

describe('AdvertismentUserComponent', () => {
  let component: AdvertismentUserComponent;
  let fixture: ComponentFixture<AdvertismentUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvertismentUserComponent]
    });
    fixture = TestBed.createComponent(AdvertismentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
