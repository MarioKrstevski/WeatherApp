import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  currentDateTime = new Date().toISOString().substring(0,10)+'Z';

  constructor(private airPolution: WeatherDataService, private sharedData : DataSharingService ){ }

  ngOnInit() {
    console.log('TUKA GLEJ GO VREMETO',this.currentDateTime);
    
    this.airPolutionSubscription=this.airPolution.getAirPolutionForCoords(this.cityCoords,this.currentDateTime).subscribe(airPollutionData => {
      console.log('onInitZagadenost',airPollutionData);
      this.airPollutionInfo = airPollutionData;
    }, error => { 
      this.errorMsg = "There is no information for current city";
      this.airPollutionInfo = null;
    });

    this.sharedData.newCoords.subscribe((newCoords : i.ICoord) => {
      console.log('Koordinati mi se smeneti');

      this.cityCoords = newCoords;
      console.log('onInitStuf',this.cityCoords);
      
      
      this.airPolutionSubscription.unsubscribe();

      this.airPolution.getAirPolutionForCoords(newCoords,this.currentDateTime).subscribe( airPollutionData =>{
        this.errorMsg = "";
        console.log("Stuff is logged now but not  changed in the DOM");
        console.log('zagadenost',airPollutionData);
        
        this.airPollutionInfo = airPollutionData;
      }, error => {
        this.errorMsg = "There is no information for that location or timeframe";
        this.airPollutionInfo = null;
      })
    });

    this.sharedData.newDateTime.subscribe((newDateTime : string) => {
      console.log('Vremeto e smeneto');
      
      this.airPolutionSubscription.unsubscribe();

      this.airPolution.getAirPolutionForCoords(this.cityCoords, newDateTime).subscribe( airPollutionData =>{
        this.currentDateTime = newDateTime;
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
  
}
