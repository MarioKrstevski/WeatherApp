import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseCitiesComponent } from './browse-cities.component';

describe('BrowseCitiesComponent', () => {
    let component: BrowseCitiesComponent;
    let fixture: ComponentFixture<BrowseCitiesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BrowseCitiesComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BrowseCitiesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
