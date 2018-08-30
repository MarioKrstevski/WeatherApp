import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { WeatherDataService } from '../services/weather-data.service';

@Component({
  selector: 'app-air-polution',
  templateUrl: './air-polution.component.html',
  styleUrls: ['./air-polution.component.css']
})
export class AirPolutionComponent implements OnInit {

  constructor(private airPolution: WeatherDataService) { }

  ngOnInit() {
    this.airPolution.getAirPolutionForCity('Kumanovo')
  }

}
