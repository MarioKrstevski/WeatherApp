import { Component, OnInit } from '@angular/core';

import { WeatherDataService } from '../services/weather-data.service';
import { DataSharingService } from '../services/data-sharing.service';

import * as i from "../../interaces/weatherdata";
import { WeatherData } from '../../models/weather-data.model';
import { WeatherInfo } from '../../models/weather-info.model';

@Component({
  selector: 'app-city-weather-info',
  templateUrl: './city-weather-info.component.html',
  styleUrls: ['./city-weather-info.component.css'],
  providers: []
})
export class CityWeatherInfoComponent implements OnInit {

  currentTime: Date = new Date(); // used for the clock
  currentSelectedCity = '';

  currentDate = this.currentTime.toLocaleDateString("en-GB").replace(/\//g, ".");
  weatherData: WeatherData;
  cityLonLat = {
    "lon": 0,
    "lat": 0
  };
  preview = new Array<WeatherInfo>();
  myData: Array<Array<WeatherInfo>>;

  showSpinner = true;

  constructor(private dataSharingService: DataSharingService, private weather: WeatherDataService) { }

  ngOnInit() {
    this.dataSharingService.turnOnSpinner();
    this.updateCurrentTime();

    this.dataSharingService.newCity.subscribe((newCity: string) => {
      if(newCity !== this.currentSelectedCity){
        this.getWeatherForCity(newCity);
        this.currentSelectedCity = newCity;
      }
    })
    this.dataSharingService.newSpinnerToggle.subscribe((newValue: boolean) =>{
      this.showSpinner = newValue;
    })
  }
  getWeatherForCity(city: string){
    this.weather.getWeather(city).subscribe(weatherInfo => {
      this.currentSelectedCity = weatherInfo.city.name;
      this.dataSharingService.turnOffSpinner()
      this.setData(weatherInfo);
    });
  }
  setData(weatherInfo: WeatherData) {
    this.weatherData = weatherInfo;
    this.cityLonLat.lat = this.weatherData.city.coord.lon;
    this.cityLonLat.lon = this.weatherData.city.coord.lat;

    this.dataSharingService.changeCoordinates(this.cityLonLat);
    this.myData = this.createDaysArray(weatherInfo);
    this.preview = this.createPreview(this.myData);
  }
  // When we search for another city we get another Data,
  // and this method is called to update the information
  // this is called in HTML when search bar component passed data
  // to parent (this component)
  updateWeatherData(newWeatherData: WeatherData) {
    this.dataSharingService.turnOffSpinner();
    this.weatherData = newWeatherData;

    this.cityLonLat.lat = this.weatherData.city.coord.lon;
    this.cityLonLat.lon = this.weatherData.city.coord.lat;

    this.dataSharingService.changeCoordinates(this.cityLonLat);
    this.myData = this.createDaysArray(newWeatherData);
    this.preview = this.createPreview(this.myData);

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
      }
      else {
        endResult.push(oneDay);
        oneDay = new Array<i.IWeatherInfo>();
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
      if (timeStamp.main.temp_max > maxTemp) {
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
}
