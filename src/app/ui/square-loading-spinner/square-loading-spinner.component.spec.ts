import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareLoadingSpinnerComponent } from './square-loading-spinner.component';

describe('LoadingSpinnerComponent', () => {
    let component: SquareLoadingSpinnerComponent;
    let fixture: ComponentFixture<SquareLoadingSpinnerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SquareLoadingSpinnerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SquareLoadingSpinnerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
