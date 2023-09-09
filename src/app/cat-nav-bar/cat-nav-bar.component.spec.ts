import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatNavBarComponent } from './cat-nav-bar.component';

describe('CatNavBarComponent', () => {
  let component: CatNavBarComponent;
  let fixture: ComponentFixture<CatNavBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatNavBarComponent]
    });
    fixture = TestBed.createComponent(CatNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
