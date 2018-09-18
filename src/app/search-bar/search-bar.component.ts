import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

import { WeatherDataService } from '../ui/services/weather-data.service';
import { DataSharingService } from '../ui/services/data-sharing.service';

import { WeatherData } from '../models/weather-data.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-search-bar', templateUrl: './search-bar.component.html', styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {

    @Output() public weatherData = new EventEmitter();

    private subscriptions: Subscription = new Subscription;

    weatherDataForCity: WeatherData;
    errorMsg: string = '';
    currentlyDisplayedCity: string = 'New York';

    constructor(private weather: WeatherDataService, private dataSharingService: DataSharingService) {
    }

    ngOnInit() {
        const citySubscription = this.dataSharingService.newCity.subscribe((newCity: string) => {
            if (this.currentlyDisplayedCity !== newCity) {
                this.currentlyDisplayedCity = newCity;
            }
        });
        this.subscriptions.add(citySubscription);
    }

    updateWeather(newCity: string) {
        if (newCity.trim() === '') {
            return;
        }

        if (this.currentlyDisplayedCity !== newCity) {
            this.dataSharingService.turnOnSpinner();
            let weatherSubscription = this.weather.getWeather(newCity)
                .subscribe((newCityWeather: WeatherData) => {
                    this.weatherDataForCity = newCityWeather;
                    this.weatherData.emit(this.weatherDataForCity);
                    this.errorMsg = '';
                }, error => {
                    this.errorMsg = error.replace('xyz', newCity);
                    this.dataSharingService.turnOffSpinner();
                });
            this.subscriptions.add(weatherSubscription);
            this.currentlyDisplayedCity = newCity;
        }
    }

    unsubscribe(subscription: Subscription) {
        if (subscription) {
            subscription.unsubscribe();
        }
    }

    ngOnDestroy() {
        this.unsubscribe(this.subscriptions);
    }
}
