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

  constructor() { }

  ngOnInit() {

    // this.http.get('http://jsonplaceholder.typicode.com/photos').subscribe( data => console.dir(data));
  }

}
