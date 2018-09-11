import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { WeatherDataService } from '../services/weather-data.service';
import { DataSharingService } from '../services/data-sharing.service';

import * as i from "../../interaces/weatherdata";

@Component({
  selector: 'app-air-polution',
  templateUrl: './air-polution.component.html',
  styleUrls: ['./air-polution.component.css']
})
export class AirPolutionComponent implements OnInit {

  cityCoords: i.ICoord = {lat: -74.2,lon: 40.7}; //Coords for New York, the default city

  airPolutionSubscription: Subscription;
  errorMsg: string = '';
  airPollutionInfo: i.IPollution;
  currentDateTime = new Date().toISOString().substring(0,10)+'Z';

  showSpinner = false;

  constructor(private airPolution: WeatherDataService, private dataSharingService : DataSharingService ){ }

  ngOnInit() {
    this.dataSharingService.turnOnSpinnerForAirPollution();
    this.requestNewPollutionData(this.cityCoords,this.currentDateTime);

    //Called when the are new coordinates/city selected
    this.dataSharingService.newCoords.subscribe((newCoords : i.ICoord) => {
      this.cityCoords = newCoords;
      this.unsubscribe(this.airPolutionSubscription);
      this.requestNewPollutionData(newCoords,this.currentDateTime);
    });
    //Called when the date is changed for the measurements
    this.dataSharingService.newDateTime.subscribe((newDateTime : string) => {
      this.unsubscribe(this.airPolutionSubscription);
      this.requestNewPollutionData(this.cityCoords, newDateTime);
    });
    //Controlling the loading spinner based on the data recieved
    this.dataSharingService.newSpinnerToggle.subscribe((newValue: boolean) =>{
      this.showSpinner = newValue;
    })
    this.dataSharingService.newSpinnerToggleForAirPollution.subscribe((newValue: boolean) =>{
      this.showSpinner = newValue;
    })
  }

  requestNewPollutionData(coords,dateTime){
    this.airPolution.getAirPolution(coords,dateTime).subscribe(airPollutionData => {
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
    if(subscription) {
      subscription.unsubscribe();
    }
  }
}
