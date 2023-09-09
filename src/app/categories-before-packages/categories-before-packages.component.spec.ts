import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesBeforePackagesComponent } from './categories-before-packages.component';

describe('CategoriesBeforePackagesComponent', () => {
  let component: CategoriesBeforePackagesComponent;
  let fixture: ComponentFixture<CategoriesBeforePackagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesBeforePackagesComponent]
    });
    fixture = TestBed.createComponent(CategoriesBeforePackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
