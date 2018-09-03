import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
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

  cityCoords: i.ICoord = {lat: 40.7, lon: -74.2};
  airPolutionSubscription: Subscription;
  errorMsg = '';
  airPolutionInfo;

  constructor(private airPolution: WeatherDataService, private sharedData : DataSharingService ){ }

  ngOnInit() {
    this.airPolutionSubscription=this.airPolution.getAirPolutionForCoords(this.cityCoords).subscribe(airPollutionData => {
      console.log('zagadenost',airPollutionData);
      this.airPolutionInfo = airPollutionData;
    }, error => {
      this.errorMsg = "There is no information for current city";
      this.airPolutionInfo = null;
    })



    this.sharedData.newCoords.subscribe( (newCoords) => {
      console.log('Koordinati mi se smeneti');
      
      this.airPolutionSubscription.unsubscribe();

      this.airPolution.getAirPolutionForCoords(newCoords).subscribe( airPollutionData =>{
        this.errorMsg = "";
        console.log("Stuff is logged now but not  changed in the DOM");
        
        this.airPolutionInfo = airPollutionData;
      }, error => {
        this.errorMsg = "There is no information for that location or timeframe";
        this.airPolutionInfo = null;
      })
    })
  }

  getAirPolution(newCity: string){
    this.airPolution.getAirPolutionForCoords(this.cityCoords, '2016-01-02T15:04:05Z').subscribe(updatedData =>{
      this.cityCoords = updatedData;
    })
  }

}
