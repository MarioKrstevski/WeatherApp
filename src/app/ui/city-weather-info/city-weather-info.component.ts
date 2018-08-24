import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { WeatherDataService } from '../services/weather-data.service';

@Component({
  selector: 'app-city-weather-info',
  templateUrl: './city-weather-info.component.html',
  styleUrls: ['./city-weather-info.component.css'],
  providers:[]
})
export class CityWeatherInfoComponent implements OnInit {

  currentTime = new Date();
  defaultCity = 'New York';
  currentDate = this.currentTime.toLocaleDateString("en-GB").replace(/\//g, ".");
  weatherData: IWeatherData;
  maxTemp: number;
  preview: Array<IWeatherInfo>;
  previewTemp: Array<IWeatherInfo>;
  myData: Array<Array<IWeatherInfo>>;
  // myDataTemp: Array<Array<IWeatherInfo>>;

  constructor(private http: HttpClient, private weather: WeatherDataService) { }

  ngOnInit() {
    this.weather.getWeather(this.defaultCity).subscribe(weatherInfo => {
      this.weatherData = weatherInfo; 
      // console.dir(this.weatherData);
      // this.maxTemp = this.checkMaxTemp(this.currentTime, this.weatherData);
      this.myData = this.createMyData(weatherInfo);
      // console.dir(this.myData);
      this.preview = this.createPreview(this.myData);
      console.log('preview', this.preview);
    });

    this.updateCurrentTime();  
  }

  // When we search for another city we get another Data, and this updates it
  updateWeatherData(newWeatherData: IWeatherData) {
    this.weatherData = newWeatherData;
    // console.log('New Data: ',this.weatherData);
    this.myData = this.createMyData(newWeatherData);
    // console.log('New MyData', this.myData); 
    this.preview = this.createPreview(this.myData);
    // console.log('New Preview',this.preview);

    return newWeatherData;
  }
  // Creating the preview in the first place
  createPreview(allWeek: Array<Array<IWeatherInfo>>, index:number = 0){
    let previewResult = allWeek[index];
    // console.log('index used', index);
    // console.log('allweek', allWeek);
    return previewResult;
  }
  // Preview is the middle and right screen, and this decides what is shown
  // Why cant day be displayed
  changePreview(day: Array<IWeatherInfo>, index: number){
    this.preview =  this.createPreview(this.myData,index)
    // console.log('previewChangedTo ',this.preview);
    return null;
  } 
  // Changes the structure of the WeatherData sorted by days
  createMyData(data: IWeatherData){
    let endResult = new Array<Array<IWeatherInfo>>();
    let oneDay = new Array<IWeatherInfo>();
    let currentDay = new Date();

    for( let period of data.list){
      let pDate = new Date(period.dt_txt);
      if(this.sameDay(pDate,currentDay)){
          oneDay.push(period);
      }
      else {
        endResult.push(oneDay);
        oneDay = new Array<IWeatherInfo>();
        oneDay.push(period);
        currentDay.setDate(currentDay.getDate() + 1);
      }
    }
    endResult.push(oneDay);
    console.dir(endResult);
    return endResult;
  }
  // Function to find maxTemp for the day
  checkMaxTemp(todaaysDate: Date, weatherData: IWeatherData){
    let novaNiza= new Array<IWeatherInfo>();
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
    }, 5000);
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

interface IWeatherData{
  city: ICity;
  ctn: number;
  cod: string;
  list: Array<IWeatherInfo>;
  message: number;
}
interface ICity{
  coord: JSON;
  country: string;
  name: string;
  population: number;
}
interface IWeatherInfo{
  clouds: Object;
  dt: number;
  dt_txt: string;
  main: iMain;
  rain: Object;
  sys: Object;
  weather: Array<Object>;
  wind: Object;
}
interface iMain{
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number
  temp: number;
  temp_kf: number;
  temp_max: number;
  temp_min: number;
}