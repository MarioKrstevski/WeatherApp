import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMarkerComponent } from './my-marker.component';

describe('MyMarkerComponent', () => {
  let component: MyMarkerComponent;
  let fixture: ComponentFixture<MyMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMarkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
