import { Component, OnInit } from '@angular/core';

import { WeatherDataService } from '../services/weather-data.service';
import { DataSharingService } from '../services/data-sharing.service';

import * as i from "../../interaces/weatherdata";

@Component({
  selector: 'app-city-weather-info',
  templateUrl: './city-weather-info.component.html',
  styleUrls: ['./city-weather-info.component.css'],
  providers: []
})
export class CityWeatherInfoComponent implements OnInit {
  currentTime = new Date();
  currentSelectedCity = '';

  currentDate = this.currentTime.toLocaleDateString("en-GB").replace(/\//g, ".");
  weatherData: i.IWeatherData;
  cityLonLat = {
    "lon": 0,
    "lat": 0
  };
  preview = new Array<i.IWeatherInfo>();
  myData: Array<Array<i.IWeatherInfo>>;

  showSpinner = true;

  constructor(private dataSharingService: DataSharingService, private weather: WeatherDataService) { }

  ngOnInit() {
    this.dataSharingService.turnOnSpinner();
    this.updateCurrentTime();

    this.dataSharingService.newCity.subscribe((newCity) => {
      if(newCity !== this.currentSelectedCity){
        this.getWeatherForCity(newCity);
        this.currentSelectedCity = newCity;
      }
    })
    this.dataSharingService.newSpinnerToggle.subscribe( (newValue: boolean) =>{
      this.showSpinner = newValue;
    })
  }
  getWeatherForCity(city){
    this.weather.getWeather(city).subscribe(weatherInfo => {
      this.currentSelectedCity = weatherInfo.city.name;
      this.dataSharingService.turnOffSpinner()
      this.setData(weatherInfo);
    });
  }
  setData(weatherInfo) {
    this.weatherData = weatherInfo;
    this.cityLonLat.lat = this.weatherData.city.coord.lon;
    this.cityLonLat.lon = this.weatherData.city.coord.lat;

    this.dataSharingService.changeCoords(this.cityLonLat);
    this.myData = this.createDaysArray(weatherInfo);
    this.preview = this.createPreview(this.myData);
  }
  // When we search for another city we get another Data,
  // and this method is called to update the information
  // this is called in HTML when search bar component passed data
  // to parent (this component)
  updateWeatherData(newWeatherData: i.IWeatherData) {
    this.dataSharingService.turnOffSpinner();
    this.weatherData = newWeatherData;

    this.cityLonLat.lat = this.weatherData.city.coord.lon;
    this.cityLonLat.lon = this.weatherData.city.coord.lat;

    this.dataSharingService.changeCoords(this.cityLonLat);
    this.myData = this.createDaysArray(newWeatherData);
    this.preview = this.createPreview(this.myData);

    return newWeatherData;
  }
  createPreview(allWeek: Array<Array<i.IWeatherInfo>>, index: number = 0) {
    let previewResult = allWeek[index];
    return previewResult;
  }
  // Preview is the middle and right screen, and this decides what is shown
  changePreview(index: number) {
    this.preview = this.createPreview(this.myData, index)
    return null;
  }
  // Changes the structure of the WeatherData sorted by days
  createDaysArray(data: i.IWeatherData) {
    let endResult = new Array<Array<i.IWeatherInfo>>();
    let oneDay = new Array<i.IWeatherInfo>();
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

  isSelected(day: Array<i.IWeatherInfo>) {
    if (day[0].dt_txt === this.preview[0].dt_txt) {
      return true;
    } else {
      return false;
    }
  }

  // Function to find maxTemp for the day
  findMaxTemp(day = this.preview) {
    let maxTemp: number = 0;
    day.forEach((timeStamp) => {
      if (timeStamp.main.temp_max > maxTemp) {
        maxTemp = timeStamp.main.temp_max;
      }
    })
    return maxTemp;
  }
  // Compares if two dates are for the same day
  sameDay(d1, d2) {
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

  isTodaysDate(objectDate) {
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
  //Find the max temp for each day

  // changeMaxTemp(weatherData: i.IWeatherData) {
  //   let novaNiza = new Array<i.IWeatherInfo>();
  //   let todaysDate = new Date(weatherData.list[0].dt_txt)
  //   for (let info of weatherData.list) {
  //     let tempDate = new Date(info.dt_txt);

  //     if (this.sameDay(tempDate, todaysDate)) {
  //       novaNiza.push(info);
  //     }
  //   }
  //   console.dir(novaNiza);

  //   let todaysMaxTemp = 0;
  //   for (let i of novaNiza) {
  //     if (i.main.temp_max > todaysMaxTemp) {
  //       todaysMaxTemp = i.main.temp_max;
  //     }
  //   }
  //   console.log(todaysMaxTemp);
  //   return todaysMaxTemp;
  // }


  // For displaying NOW instead of time in the right window
  // But changed with ngIf to always use the first elemnt with NOW

  // checkRange(msecA: number) {
  //   let time: number = parseInt(this.currentTime.getTime().toString().substring(0, 10)) + 10800;
  //   // console.log(time);
  //   // let time:number = 1534971600;
  //   let msecB: number = time + 10800;

  //   if ((msecA <= time) && (time < msecB)) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }
}
