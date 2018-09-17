import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PulsatingDotLoadingSpinnerComponent } from './pulsating-dot-loading-spinner.component';

describe('SecondaryLoadingSpinnerComponent', () => {
    let component: PulsatingDotLoadingSpinnerComponent;
    let fixture: ComponentFixture<PulsatingDotLoadingSpinnerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PulsatingDotLoadingSpinnerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PulsatingDotLoadingSpinnerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
