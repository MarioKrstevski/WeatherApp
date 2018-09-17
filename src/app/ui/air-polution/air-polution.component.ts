import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

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
export class AirPolutionComponent implements OnInit {

    currentlyShownCityCoordinates: Coordinates = newYorkCoordinates;
    airPolutionSubscription: Subscription;
    errorMsg: string = '';
    airPollutionInfo: Pollution;
    currentDateTime: string = new Date().toISOString().substring(0, 10) + 'Z';

    showSpinner: boolean = false;

    constructor(private airPolution: WeatherDataService, private dataSharingService: DataSharingService) { }

    ngOnInit() {
        this.dataSharingService.turnOnSpinnerForAirPollution();
        this.requestNewPollutionData(this.currentlyShownCityCoordinates, this.currentDateTime);

        //Called when the are new coordinates/city selected
        this.dataSharingService.newCoordinates.subscribe((newCoordinates: Coordinates) => {
            this.currentlyShownCityCoordinates = newCoordinates;
            this.unsubscribe(this.airPolutionSubscription);
            this.requestNewPollutionData(newCoordinates, this.currentDateTime);
        });
        //Called when requested info for the same city but different date/period
        this.dataSharingService.newDateTime.subscribe((newDateTime: string) => {
            this.unsubscribe(this.airPolutionSubscription);
            this.requestNewPollutionData(this.currentlyShownCityCoordinates, newDateTime);
        });
        //Controlling the loading spinner based on the data recieved
        this.dataSharingService.newSpinnerToggle.subscribe((newValue: boolean) => {
            this.showSpinner = newValue;
        })
        this.dataSharingService.newSpinnerToggleForAirPollution.subscribe((newValue: boolean) => {
            this.showSpinner = newValue;
        })
    }

    requestNewPollutionData(coords: Coordinates, dateTime: string = 'current') {
        this.airPolution.getAirPolution(coords, dateTime).subscribe(airPollutionData => {
            this.errorMsg = "";
            this.airPollutionInfo = airPollutionData;
            this.dataSharingService.turnOffSpinnerForAirPollution();
        }, (error: Error) => {
            this.errorMsg = "There is no information for current city";
            this.airPollutionInfo = null;
            this.dataSharingService.turnOffSpinnerForAirPollution();
        }
        );
    }
    //unsubscribe method for any subscription
    unsubscribe(subscription: Subscription) {
        if (subscription) {
            subscription.unsubscribe();
        }
    }
}
