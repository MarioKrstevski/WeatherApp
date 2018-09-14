import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { WeatherDataService } from '../ui/services/weather-data.service';
import { DataSharingService } from '../ui/services/data-sharing.service';

import * as i from "../interaces/weatherdata";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  // TODO: Remove commented things that are not needed here
  // TODO: Remove unused methods
  // TODO: Format code, add tabulation etc.

  @Output() public weatherData = new EventEmitter();

  weatherDataForCity: i.IWeatherData;
  errorMsg = "" ;
  selectedCity = "New York";

  constructor(private weather: WeatherDataService, private dataSharingService: DataSharingService) { }

  ngOnInit() {
    this.dataSharingService.newCity.subscribe((newCity) => {
      if(this.selectedCity !== newCity){
      this.selectedCity = newCity;
      // console.log('Smenet e selectedCity vo SearchBarComponent vo  ',this.selectedCity);
      }
    });
  }

  updateWeather(newCity: string){
    if (newCity.trim() === ""){
      return;
    }
    if(this.selectedCity!==newCity){
      this.dataSharingService.turnOnSpinner();
      this.weather.getWeather(newCity).subscribe((newCityWeather: i.IWeatherData) => {
        this.weatherDataForCity = newCityWeather;
        this.weatherData.emit(this.weatherDataForCity);
        this.errorMsg = "";
      },
      error => {
        this.errorMsg = error.replace('xyz',newCity);
        this.dataSharingService.turnOffSpinner();
      });
      this.selectedCity = newCity;
    }
  }
}
