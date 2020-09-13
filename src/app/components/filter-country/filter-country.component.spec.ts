import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCountryComponent } from './filter-country.component';

describe('FilterCountryComponent', () => {
  let component: FilterCountryComponent;
  let fixture: ComponentFixture<FilterCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
