import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatBeforeAdComponent } from './cat-before-ad.component';

describe('CatBeforeAdComponent', () => {
  let component: CatBeforeAdComponent;
  let fixture: ComponentFixture<CatBeforeAdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatBeforeAdComponent]
    });
    fixture = TestBed.createComponent(CatBeforeAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
