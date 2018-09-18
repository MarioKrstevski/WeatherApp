import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';

import { WeatherDataService } from '../services/weather-data.service';
import { DataSharingService } from '../services/data-sharing.service';

import { Coordinates } from '../../models/coordinates.model';
import { Pollution } from '../../models/pollution.model';

const newYorkCoordinates = {
    lat: -74.2,
    lon: 40.7
}

@Component({
    selector: 'app-air-polution',
    templateUrl: './air-polution.component.html',
    styleUrls: ['./air-polution.component.css']
})
export class AirPolutionComponent implements OnInit, OnDestroy {

    private unsubscribe: Subject<void> = new Subject;

    currentlyShownCityCoordinates: Coordinates = newYorkCoordinates;
    cityForTheCoordinates = ''
    airPolutionSubscription: Subscription;//delete subscription
    errorMsg: string = '';
    airPollutionInfo: Pollution;
    currentDateTime: string = new Date().toISOString().substring(0, 10) + 'Z';

    showSpinner: boolean = false;

    constructor(private airPolution: WeatherDataService, private dataSharingService: DataSharingService) { }

    ngOnInit() {
        this.dataSharingService.turnOnSpinnerForAirPollution();

        //Called when the are new coordinates/city selected
        this.dataSharingService.newCoordinates.pipe(skip(1), takeUntil(this.unsubscribe)).subscribe((newCoordinates: Coordinates) => {
            this.currentlyShownCityCoordinates = newCoordinates;
            this.requestNewPollutionData(newCoordinates, this.currentDateTime);
        });
        //Called when requested info for the same city but different date/period
        this.dataSharingService.newDateTime.pipe(skip(1), takeUntil(this.unsubscribe)).subscribe((newDateTime: string) => {
            this.requestNewPollutionData(this.currentlyShownCityCoordinates, newDateTime);
        });
        //Controlling the loading spinner based on the data recieved
        this.dataSharingService.newSpinnerToggle.pipe(takeUntil(this.unsubscribe)).subscribe((newValue: boolean) => {
            this.showSpinner = newValue;
        })
        this.dataSharingService.newSpinnerToggleForAirPollution.pipe(takeUntil(this.unsubscribe)).subscribe((newValue: boolean) => {
            this.showSpinner = newValue;
        })
    }

    requestNewPollutionData(coords: Coordinates, dateTime: string = 'current') {
        this.airPolution.getAirPolution(coords, dateTime).pipe(takeUntil(this.unsubscribe)).subscribe(airPollutionData => {
            console.log('pollutionData', airPollutionData);
            this.errorMsg = "";
            this.airPollutionInfo = airPollutionData;
            this.dataSharingService.turnOffSpinnerForAirPollution();
        }, (error: Error) => {
            this.dataSharingService.newCity.pipe(takeUntil(this.unsubscribe)).subscribe((cityNewName: string) => {
                let newDate = new Date(dateTime).toLocaleDateString();
                this.errorMsg = `There is no information for ${cityNewName} on ${newDate}`;
                this.dataSharingService.turnOffSpinnerForAirPollution();
            });
            this.airPollutionInfo = null;
        }
        );
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
