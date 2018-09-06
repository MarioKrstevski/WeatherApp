import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryLoadingSpinnerComponent } from './secondary-loading-spinner.component';

describe('SecondaryLoadingSpinnerComponent', () => {
  let component: SecondaryLoadingSpinnerComponent;
  let fixture: ComponentFixture<SecondaryLoadingSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryLoadingSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryLoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
