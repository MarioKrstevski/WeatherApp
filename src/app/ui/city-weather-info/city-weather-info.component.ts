import { Component, OnDestroy, OnInit } from '@angular/core';

import { WeatherDataService } from '../services/weather-data.service';
import { DataSharingService } from '../services/data-sharing.service';

import { WeatherData } from '../../models/weather-data.model';
import { WeatherInfo } from '../../models/weather-info.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { animate, state, style, transition, trigger } from "@angular/animations";


@Component({
    selector: 'app-city-weather-info',
    templateUrl: './city-weather-info.component.html',
    styleUrls: ['./city-weather-info.component.css'],
    providers: [],
    animations: [
        trigger('listRotatingAnimation', [
            state('insert', style({
                opacity: 1
            })),
            state('delete', style({
                opacity: 0
            })),
            transition('delete => insert', animate('500ms ease-out')),
            transition('insert => delete', animate('700ms ease-in'))
        ])
    ]
})

// transition('delete => insert', [
//     query(':enter', style({
//         opacity: 0
//     }), { optional: true }),
//     query(':enter',
//         animate('600ms ease-in', keyframes([
//             style({ opacity: 0, transform: 'translateY(-10px)', offset: 0 }),
//             style({ opacity: .5, transform: 'translateY(-5px)', offset: 0.5 }),
//             style({ opacity: 1, transform: 'translateY(0px)', offset: 1 }),
//         ])), { optional: true }),

//     query(':leave',
//         animate('600ms  ease-out', keyframes([
//             style({ opacity: 1, transform: 'translateY(0px)', offset: 0 }),
//             style({ opacity: .5, transform: 'translateY(-5px)', offset: 0.5 }),
//             style({ opacity: 0, transform: 'translateY(-10px)', offset: 1 }),
//         ])), { optional: true })
// ]),
export class CityWeatherInfoComponent implements OnInit, OnDestroy {

    private unsubscribe: Subject<void> = new Subject;

    currentTime: Date = new Date(); // used for the clock
    currentSelectedCity = '';

    state: boolean = true;
    lastItem;

    currentDate = this.currentTime.toLocaleDateString("en-GB").replace(/\//g, ".");
    weatherData: WeatherData;
    cityLonLat = {
        "lon": 0,
        "lat": 0
    };
    preview = new Array<WeatherInfo>();
    myData: Array<Array<WeatherInfo>>;

    showSpinner: boolean = true;

    constructor(private dataSharingService: DataSharingService, private weather: WeatherDataService) {
    }

    ngOnInit() {
        this.dataSharingService.turnOnSpinner();
        this.updateCurrentTime();


        this.dataSharingService.newCity.pipe(takeUntil(this.unsubscribe)).subscribe((newCity: string) => {
            if (newCity !== this.currentSelectedCity) {
                this.getWeatherForCity(newCity);
                this.currentSelectedCity = newCity;
            }
        });

        this.dataSharingService.newSpinnerToggle.pipe(takeUntil(this.unsubscribe)).subscribe((newValue: boolean) => {
            this.showSpinner = newValue;
        });

    }

    get stateStatus() {
        return this.state ? 'insert' : 'delete';
    }

    toggleState() {
        this.state = !this.state;
    }

    f

    animationStart(event) {

        // console.log(`${this.stateStatus}: Event started`);
        if (this.stateStatus === 'insert') {
            if (this.lastItem !== null) {
                this.preview.unshift(this.lastItem);
                // console.log('Added last item');
            }
        } else if (this.stateStatus === 'delete') {
            this.lastItem = this.preview.pop();
            // console.log('Removed last item');
        }
    }

    animationFinish(event) {
        // console.log(`${this.stateStatus}: Event finished`);

        if (this.stateStatus === 'insert') {
            setTimeout(() => {
                this.toggleState();
            }, 2000)
        } else if (this.stateStatus === 'delete') {
            setTimeout(() => {
                this.toggleState();
            }, 2000)
        }
    }


    getWeatherForCity(city: string) {
        this.weather.getWeather(city).pipe(takeUntil(this.unsubscribe)).subscribe(weatherInfo => {
            this.currentSelectedCity = weatherInfo.city.name;
            this.dataSharingService.turnOffSpinner()
            this.updateWeatherData(weatherInfo);
        });
    }

    // When we search for another city we get another Data,
    // and this method is called to update the information
    // this is called in HTML when search bar component passed data
    // to parent (this component)
    updateWeatherData(newWeatherData: WeatherData) {
        this.dataSharingService.turnOffSpinner();
        this.dataSharingService.changeCity(newWeatherData.city.name);

        this.weatherData = newWeatherData;
        this.cityLonLat.lat = this.weatherData.city.coord.lon;
        this.cityLonLat.lon = this.weatherData.city.coord.lat;

        this.dataSharingService.changeCoordinates(this.cityLonLat);
        this.myData = this.createDaysArray(newWeatherData);
        console.log(this.myData, 'This is my data');
        this.preview = this.createPreview(this.myData);
        console.log(this.preview, 'This is preview');


        this.toggleState();

        return newWeatherData;
    }

    createPreview(allWeek: Array<Array<WeatherInfo>>, index: number = 0) {
        let previewResult = allWeek[index];
        return previewResult;
    }

    // Preview is the middle and right screen, and this decides what is shown
    changePreview(index: number) {
        this.preview = this.createPreview(this.myData, index)
        return null;
    }

    // Changes the structure of the WeatherData sorted by days
    createDaysArray(data: WeatherData) {
        let endResult = new Array<Array<WeatherInfo>>();
        let oneDay = new Array<WeatherInfo>();
        let currentDay = new Date();

        for (let period of data.list) {
            let pDate = new Date(period.dt_txt);
            if (this.sameDay(pDate, currentDay)) {
                oneDay.push(period);
            } else {
                endResult.push(oneDay);
                oneDay = new Array<WeatherInfo>();
                oneDay.push(period);
                currentDay.setDate(currentDay.getDate() + 1);
            }

        }
        endResult.push(oneDay);
        return endResult;
    }

    isSelected(day: Array<WeatherInfo>) {
        if (day[0].dt_txt === this.preview[0].dt_txt) {
            return true;
        } else {
            return false;
        }
    }

    // Function to find maxTemp for the day
    findMaxTemp(day: Array<WeatherInfo> = this.preview) {
        let maxTemp: number = 0;
        day.forEach((timeStamp) => {
            if (timeStamp && timeStamp.main.temp_max > maxTemp) {
                maxTemp = timeStamp.main.temp_max;
            }

        })
        return maxTemp;
    }

    // Compares if two dates are for the same day
    sameDay(d1: Date, d2: Date) {
        return d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();
    }

    // Timer to update clock real time
    updateCurrentTime() {
        setInterval(() => {
            this.currentTime = new Date();
        }, 1000);
    }

    isTodaysDate(objectDate: string) {
        let dt = new Date();
        let date = dt.getFullYear() + '/' + (((dt.getMonth() + 1) < 10) ? '0' : '') + (dt.getMonth() + 1) + '/' + ((dt.getDate() < 10) ? '0' : '') + dt.getDate();
        let dateFormated = date.replace(/\//g, "-");
        let objectDateFormated = objectDate.substring(0, 10);

        if (objectDateFormated == dateFormated) {
            return true;
        } else {
            return false;
        }

    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
