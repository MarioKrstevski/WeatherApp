import { Component, Input, OnInit } from '@angular/core';
import { SingleCity } from '../../../models/single-city.model';

@Component({
    selector: 'app-my-marker',
    templateUrl: './my-marker.component.html',
    styleUrls: ['./my-marker.component.css']
})
export class MyMarkerComponent {

    @Input() displayInfo: SingleCity;
    isClicked = false;

    isClickedToggle() {
        event.stopPropagation();
        this.isClicked = !this.isClicked;
    }
}
