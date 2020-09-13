import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterLanguageComponent } from './filter-language.component';

describe('FilterLanguageComponent', () => {
  let component: FilterLanguageComponent;
  let fixture: ComponentFixture<FilterLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterLanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
