import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { WeatherDataService } from '../ui/services/weather-data.service';
import { DataSharingService } from '../ui/services/data-sharing.service';

import { WeatherData } from '../models/weather-data.model';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

    @Output() public weatherData = new EventEmitter();

    weatherDataForCity: WeatherData;
    errorMsg: string = "";
    currentlyDisplayedCity: string = "New York";

    constructor(private weather: WeatherDataService, private dataSharingService: DataSharingService) { }

    ngOnInit() {
        this.dataSharingService.newCity.subscribe((newCity: string) => {
            if (this.currentlyDisplayedCity !== newCity) {
                this.currentlyDisplayedCity = newCity;
            }
        });
    }

    updateWeather(newCity: string) {
        if (newCity.trim() === "") {
            return;
        }

        if (this.currentlyDisplayedCity !== newCity) {
            this.dataSharingService.turnOnSpinner();
            this.weather.getWeather(newCity).subscribe((newCityWeather: WeatherData) => {
                this.weatherDataForCity = newCityWeather;
                this.weatherData.emit(this.weatherDataForCity);
                this.errorMsg = "";
            },
                error => {
                    this.errorMsg = error.replace('xyz', newCity);
                    this.dataSharingService.turnOffSpinner();
                });
            this.currentlyDisplayedCity = newCity;
        }
    }
}
