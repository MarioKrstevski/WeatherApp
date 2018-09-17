import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Coordinates } from '../../models/coordinates.model';

@Injectable({
    providedIn: 'root'
})
// TODO: Format code, add non-programmer readable variable names
export class DataSharingService {

    private defaultCity = new BehaviorSubject<string>('New York');
    newCity = this.defaultCity.asObservable();

    private defaultCoordinates = new BehaviorSubject({
        lat: -74.2121,
        lon: 40.7306
    });
    newCoordinates = this.defaultCoordinates.asObservable();

    private defaultDateTime = new BehaviorSubject<string>(new Date().toLocaleDateString());
    newDateTime = this.defaultDateTime.asObservable();

    private toggleSpinner = new BehaviorSubject<boolean>(false);
    newSpinnerToggle = this.toggleSpinner.asObservable();

    private toggleSpinnerForAirPollution = new BehaviorSubject<boolean>(false);
    newSpinnerToggleForAirPollution = this.toggleSpinnerForAirPollution.asObservable();

    turnOnSpinner() {
        this.toggleSpinner.next(true);
    }
    turnOffSpinner() {
        this.toggleSpinner.next(false);
    }
    turnOnSpinnerForAirPollution() {
        this.toggleSpinnerForAirPollution.next(true);
    }
    turnOffSpinnerForAirPollution() {
        this.toggleSpinnerForAirPollution.next(false);
    }

    changeCity(city: string) {
        this.defaultCity.next(city);
    }
    changeCoordinates(coordinates: Coordinates) {
        this.defaultCoordinates.next(coordinates);
    }
    changeDateTime(dateTime: string) {
        this.defaultDateTime.next(dateTime);
    }
}
