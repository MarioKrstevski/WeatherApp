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

  cityCoords: i.ICoord = {lat: -74.2,lon: 40.7};
  airPolutionSubscription: Subscription;
  errorMsg: string = '';
  airPollutionInfo: i.IPollution;
  currentDate = new Date().toLocaleTimeString();

  constructor(private airPolution: WeatherDataService, private sharedData : DataSharingService ){ }

  ngOnInit() {
    this.airPolutionSubscription=this.airPolution.getAirPolutionForCoords(this.cityCoords).subscribe(airPollutionData => {
      console.log('onInitZagadenost',airPollutionData);
      this.airPollutionInfo = airPollutionData;
    }, error => {
      this.errorMsg = "There is no information for current city";
      this.airPollutionInfo = null;
    });



    this.sharedData.newCoords.subscribe( (newCoords : i.ICoord) => {
      console.log('Koordinati mi se smeneti');
      
      this.airPolutionSubscription.unsubscribe();

      this.airPolution.getAirPolutionForCoords(newCoords).subscribe( airPollutionData =>{
        this.errorMsg = "";
        console.log("Stuff is logged now but not  changed in the DOM");
        console.log('zagadenost',airPollutionData);
        
        this.airPollutionInfo = airPollutionData;
      }, error => {
        this.errorMsg = "There is no information for that location or timeframe";
        this.airPollutionInfo = null;
      })
    });
  }

  getAirPolution(newCity: string){
    this.airPolution.getAirPolutionForCoords(this.cityCoords, '2016-01-02T15:04:05Z').subscribe(updatedData =>{
      this.cityCoords = updatedData;
    })
  }

}
