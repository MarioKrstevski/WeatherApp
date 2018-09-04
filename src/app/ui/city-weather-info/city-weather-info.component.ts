import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { WeatherDataService } from '../services/weather-data.service';
import { DataSharingService } from '../services/data-sharing.service';
import { Subscription } from 'rxjs';

import * as i from "../../interaces/weatherdata";

@Component({
  selector: 'app-city-weather-info',
  templateUrl: './city-weather-info.component.html',
  styleUrls: ['./city-weather-info.component.css'],
  providers:[]
})
export class CityWeatherInfoComponent implements OnInit {

  currentTime = new Date();
  currentCity = 'New York';

  currentDate = this.currentTime.toLocaleDateString("en-GB").replace(/\//g, ".");
  weatherData: i.IWeatherData;
  cityLonLat = {
    "lon": 0,
    "lat": 0
  };
  preview = new Array<i.IWeatherInfo>();
  previewTemp: Array<i.IWeatherInfo>;
  myData: Array<Array<i.IWeatherInfo>>;
  weatherSubscription: Subscription;
  // myDataTemp: Array<Array<IWeatherInfo>>;

  showSpinner = true;

  constructor(private http: HttpClient,private dataSharing: DataSharingService ,private weather: WeatherDataService) { }

  ngOnInit() {
    this.weatherSubscription = this.weather.getWeather(this.currentCity).subscribe(weatherInfo => {
      console.log("Mi vrakja nesto");
      
      this.setData(weatherInfo);
      });

    this.updateCurrentTime();  

    this.dataSharing.newCity.subscribe((newCity) => {
      // console.log(newCity);
      this.weatherSubscription.unsubscribe();
      this.weather.getWeather(newCity).subscribe(weatherInfo => this.setData(weatherInfo));
    })

  }

  setData(weatherInfo){

    this.showSpinner = false;

    this.weatherData = weatherInfo; 
    console.dir(this.weatherData);

    this.cityLonLat.lat = this.weatherData.city.coord.lon;
    this.cityLonLat.lon = this.weatherData.city.coord.lat;

    // console.log('kooridnati', this.cityLonLat);

    this.dataSharing.changeCoords(this.cityLonLat);
    
    // this.maxTemp = this.checkMaxTemp(this.currentTime, this.weatherData);
    this.myData = this.createMyData(weatherInfo);
    // console.dir(this.myData);
    this.preview = this.createPreview(this.myData);
    // console.log('preview', this.preview);
  }

  isSelected(day:Array<i.IWeatherInfo>){
    if(day[0].dt_txt === this.preview[0].dt_txt){
      return true;
    } else {
      return false;
    }
  }

  // When we search for another city we get another Data, and this updates it
  updateWeatherData(newWeatherData: i.IWeatherData) {
    this.weatherData = newWeatherData;

    this.cityLonLat.lat = this.weatherData.city.coord.lon;
    this.cityLonLat.lon = this.weatherData.city.coord.lat;
    console.log('kooridnati na promena', this.cityLonLat);
    
    this.dataSharing.changeCoords(this.cityLonLat);
    // console.log('New Data: ',this.weatherData);
    this.myData = this.createMyData(newWeatherData);
    // console.log('New MyData', this.myData); 
    this.preview = this.createPreview(this.myData);
    // console.log('New Preview',this.preview);

    return newWeatherData;
  }
  // Creating the preview in the first place
  createPreview(allWeek: Array<Array<i.IWeatherInfo>>, index:number = 0){
    let previewResult = allWeek[index];
    // console.log('index used', index);
    // console.log('allweek', allWeek);
    return previewResult;
  }
  // Preview is the middle and right screen, and this decides what is shown
  // Why cant day be displayed
  changePreview(day: Array<i.IWeatherInfo>, index: number){
    this.preview =  this.createPreview(this.myData,index)
    // console.log('previewChangedTo ',this.preview);
    return null;
  } 
  // Changes the structure of the WeatherData sorted by days
  createMyData(data: i.IWeatherData){
    let endResult = new Array<Array<i.IWeatherInfo>>();
    let oneDay = new Array<i.IWeatherInfo>();
    let currentDay = new Date();

    for( let period of data.list){
      let pDate = new Date(period.dt_txt);
      if(this.sameDay(pDate,currentDay)){
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
    console.dir(endResult);
    return endResult;
  }
  // Function to find maxTemp for the day
  findMaxTemp(day = this.preview){
    let maxTemp: number = 0;
    day.forEach((timeStamp) =>{
      if(timeStamp.main.temp_max > maxTemp){
        maxTemp = timeStamp.main.temp_max ;
      }
    })

    return maxTemp;
  }
  changeMaxTemp(todaaysDate: Date, weatherData: i.IWeatherData){
    let novaNiza= new Array<i.IWeatherInfo>();
    let todaysDate = new Date(weatherData.list[0].dt_txt)
    for(let info of weatherData.list){
      let tempDate = new Date(info.dt_txt);
      

      if (this.sameDay(tempDate,todaysDate)){
        novaNiza.push(info);
      }
    }
    console.dir(novaNiza);

    let todaysMaxTemp = 0;
    for(let i of novaNiza){
      if (i.main.temp_max > todaysMaxTemp){
        todaysMaxTemp = i.main.temp_max;
      }
    }
    console.log(todaysMaxTemp);
    return todaysMaxTemp;
  }
  // Compares if two dates are for the same day
  sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }
  // Timer to update clock real time
  updateCurrentTime(){
    setInterval(() => {         
      this.currentTime = new Date();
    }, 1000);
  }
  isTodaysDate(objectDate){
    let dt = new Date();
    let date = dt.getFullYear() + '/' + (((dt.getMonth() + 1) < 10) ? '0' : '') + (dt.getMonth() + 1) + '/' + ((dt.getDate() < 10) ? '0' : '') + dt.getDate();
    let dateFormated = date.replace(/\//g, "-");
    let objectDateFormated = objectDate.substring(0,10);

    if(objectDateFormated == dateFormated){
      return true;
    } else {
      return false;
    }
  }
  // For displaying NOW
  checkRange(msecA: number){
    let time: number = parseInt(this.currentTime.getTime().toString().substring(0,10))+10800;
    // console.log(time);
    // let time:number = 1534971600;
    let msecB: number = time + 10800;
    
    if((msecA<=time) && (time<msecB)){
      return false;
    } else {
      return true;
    }    
  }
}
