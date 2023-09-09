import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryFiltersComponent } from './subcategory-filters.component';

describe('SubcategoryFiltersComponent', () => {
  let component: SubcategoryFiltersComponent;
  let fixture: ComponentFixture<SubcategoryFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubcategoryFiltersComponent]
    });
    fixture = TestBed.createComponent(SubcategoryFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
