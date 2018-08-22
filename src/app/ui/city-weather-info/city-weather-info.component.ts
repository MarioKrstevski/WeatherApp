import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { WeatherDataService } from '../services/weather-data.service';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

@Component({
  selector: 'app-city-weather-info',
  templateUrl: './city-weather-info.component.html',
  styleUrls: ['./city-weather-info.component.css'],
  providers:[
    
  ]
})
export class CityWeatherInfoComponent implements OnInit {

  currentTime = new Date();
  defaultCity='New York';
  currentDate = this.currentTime.toLocaleDateString("en-GB").replace(/\//g, ".");
  weatherData: IWeatherData;

  weeklyData;


  days = [
    {
      status:'Sunny',
      temp:'9',
      date: '27.06.2016',
      allDay: [
        {time:'Now', temp:'9'},
        {time:'12:00', temp:'11'},
        {time:'15:00', temp:'21'},
        {time:'18:00', temp:'12'},
        {time:'21:00', temp:'3'},
        {time:'23:00', temp:'21'},
        {time:'01:00', temp:'22'},
        {time:'04:00', temp:'12'},
        {time:'07:00', temp:'11'},
        {time:'09:00', temp:'10'}
      ]
    },
    {
      status:'Windy',
      temp:'12',
      date: '28.06.2016',
      allDay: [
        {time:'Now', temp:'9'},
        {time:'12:00', temp:'11'},
        {time:'15:00', temp:'21'},
        {time:'18:00', temp:'12'},
        {time:'21:00', temp:'3'},
        {time:'23:00', temp:'21'},
        {time:'01:00', temp:'22'},
        {time:'04:00', temp:'12'},
        {time:'07:00', temp:'11'},
        {time:'09:00', temp:'10'}
      ]
    },
    {
      status:'Cloudy',
      temp:'11',
      date: '29.06.2016',
      allDay: [
        {time:'Now', temp:'9'},
        {time:'12:00', temp:'13'},
        {time:'15:00', temp:'22'},
        {time:'18:00', temp:'16'},
        {time:'21:00', temp:'33'},
        {time:'23:00', temp:'25'},
        {time:'01:00', temp:'22'},
        {time:'04:00', temp:'16'},
        {time:'07:00', temp:'13'},
        {time:'09:00', temp:'17'}
      ]
    },
    {
      status:'Rainy',
      temp:'14',
      date: '30.06.2016',
      allDay: [
        {time:'Now', temp:'9'},
        {time:'12:00', temp:'15'},
        {time:'15:00', temp:'21'},
        {time:'18:00', temp:'32'},
        {time:'21:00', temp:'42'},
        {time:'23:00', temp:'11'},
        {time:'01:00', temp:'32'},
        {time:'04:00', temp:'15'},
        {time:'07:00', temp:'13'},
        {time:'09:00', temp:'11'}
      ]
    },
    {
      status:'Sunny',
      temp:'22',
      date: '31.06.2016',
      allDay: [
        {time:'Now', temp:'9'},
        {time:'12:00', temp:'13'},
        {time:'15:00', temp:'22'},
        {time:'18:00', temp:'16'},
        {time:'21:00', temp:'33'},
        {time:'23:00', temp:'25'},
        {time:'01:00', temp:'22'},
        {time:'04:00', temp:'16'},
        {time:'07:00', temp:'13'},
        {time:'09:00', temp:'17'}
      ]
    },
    {
      status:'Windy',
      temp:'7',
      date: '01.07.2016',
      allDay: [
        {time:'Now', temp:'9'},
        {time:'12:00', temp:'15'},
        {time:'15:00', temp:'21'},
        {time:'18:00', temp:'32'},
        {time:'21:00', temp:'42'},
        {time:'23:00', temp:'11'},
        {time:'01:00', temp:'32'},
        {time:'04:00', temp:'15'},
        {time:'07:00', temp:'13'},
        {time:'09:00', temp:'11'}
      ]
    },
    {
      status:'Rainy',
      temp:'11',
      date: '02.07.2016',
      allDay: [
        {time:'Now', temp:'9'},
        {time:'12:00', temp:'11'},
        {time:'15:00', temp:'21'},
        {time:'18:00', temp:'12'},
        {time:'21:00', temp:'3'},
        {time:'23:00', temp:'21'},
        {time:'01:00', temp:'22'},
        {time:'04:00', temp:'12'},
        {time:'07:00', temp:'11'},
        {time:'09:00', temp:'10'}
      ]
    }
  ];
  

  constructor(private http: HttpClient, private weather: WeatherDataService) { }

  ngOnInit() {
    this.weather.getWeather(this.defaultCity).subscribe(weatherInfo => this.weatherData=weatherInfo);
    this.weather.getWeekly(this.defaultCity).subscribe(weeklyInfo => {this.weeklyData=weeklyInfo;console.dir(this.weeklyData)});
    this.updateCurrentTime();  
  
  }

  updateCurrentTime(){
    setInterval(() => {         
      this.currentTime = new Date();
    }, 5000);
  }

  changeView(index){
    console.log('View should change');
    this.currentTime = new Date();
    console.log('Sega vremeto e: ', this.weatherData.name);
    console.log('weekly data', this.weeklyData);
  
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

  setWeatherData(newData: IWeatherData) {
    this.weatherData = newData;
  }

}

interface IWeatherData{
  base: string;
  clouds: Object;
  cod: number;
  coord: Object;
  dt: number;
  id: number;
  main: Object;
  name: string;
  sys: Object;
  visibility: number;
  weather: Array<IWeather>;
  wind: Object;
}
interface IWeather{
  id: number;
  main: string;
  description: string;
  icon: string;
}