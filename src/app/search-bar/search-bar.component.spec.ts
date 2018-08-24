import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {of} from 'rxjs/index';
import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  let myData = [
    [{

    }],
    [{

    }]
  ]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // let getWeatherSpy = spyOn(component.weather, "getWeather")
    // .and.returnValue(of({
    //   name: "New York"
    // })

    // .and.returnValue(throw({errorMessage: "error"}))
    // 

    component.updateWeather("test-city")
    expect(component).toBeTruthy();

    // expect(component.myData).toBe(myData)
  });
});
