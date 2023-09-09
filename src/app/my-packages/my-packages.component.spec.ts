import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPackagesComponent } from './my-packages.component';

describe('MyPackagesComponent', () => {
  let component: MyPackagesComponent;
  let fixture: ComponentFixture<MyPackagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyPackagesComponent]
    });
    fixture = TestBed.createComponent(MyPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
