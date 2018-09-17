import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityWeatherInfoComponent } from './city-weather-info.component';

describe('CityWeatherInfoComponent', () => {
    let component: CityWeatherInfoComponent;
    let fixture: ComponentFixture<CityWeatherInfoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CityWeatherInfoComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CityWeatherInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
