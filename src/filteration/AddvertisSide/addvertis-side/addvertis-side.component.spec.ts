import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvertisSideComponent } from './addvertis-side.component';

describe('AddvertisSideComponent', () => {
  let component: AddvertisSideComponent;
  let fixture: ComponentFixture<AddvertisSideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddvertisSideComponent]
    });
    fixture = TestBed.createComponent(AddvertisSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
