import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

import { from } from 'rxjs';

@Component({
  selector: 'app-city-weather-info',
  templateUrl: './city-weather-info.component.html',
  styleUrls: ['./city-weather-info.component.css'],
  providers:[
    
  ]
})
export class CityWeatherInfoComponent implements OnInit {

  currentTime = new Date();
  defaultCity: string ='New York';
  currentDayIndex = 1;
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
  

  constructor() { }

  ngOnInit() {

    // this.http.get('http://jsonplaceholder.typicode.com/photos').subscribe( data => console.dir(data));
  }

  changeView(index){
    console.log('View should change');
    this.currentTime = new Date();
    this.currentDayIndex=index;

  }

}
