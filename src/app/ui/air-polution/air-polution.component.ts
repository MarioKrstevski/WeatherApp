import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { WeatherDataService } from '../services/weather-data.service';

@Component({
  selector: 'app-air-polution',
  templateUrl: './air-polution.component.html',
  styleUrls: ['./air-polution.component.css']
})
export class AirPolutionComponent implements OnInit {

  airHTML;

  constructor(private airPolution: WeatherDataService) { }

  ngOnInit() {
    this.airPolution.getAirPolutionForCity('Kumanovo').subscribe(airPolutionData => {
      console.log('zagadenost',airPolutionData);
      this.airHTML = airPolutionData
    })
  }

  getAirPolution(newCity: string){
    this.airPolution.getAirPolutionForCity(newCity).subscribe(updatedData =>{
      this.airHTML = updatedData;
    })
  }

}
