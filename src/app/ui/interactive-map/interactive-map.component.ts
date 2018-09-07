import { Component, OnInit } from '@angular/core';


import * as i from "../../interaces/weatherdata";
import { WeatherDataService } from "../services/weather-data.service";

@Component({
  selector: 'app-interactive-map',
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.css']
})
export class InteractiveMapComponent implements OnInit {
  // googleMapsAPIKey = 'AIzaSyC-UOu23S6rRvG4vbsbT9ps0U5tHsSgccA';
  lat = 51.678418;
  lng = 7.809007;
  locationChosen = false;
  cities: i.ISingeCity[] ;
  coords = [{
    lat: 51.6,
    lon: 7.1
  }, {
    lat: 51.6,
    lon: 7.3
  }];

  constructor(private weather: WeatherDataService) {}



  ngOnInit() {
    this.weather.getCities(-10,39.5,32,57.6).subscribe(citiesData => {

      console.log(citiesData);

      this.cities = citiesData.list;
      console.log('Gradovi', this.cities);

      console.log('latitude: ', this.cities[0].coord.Lat);


    });
  }

  onChoseLocation(event) {
    console.log(event);

    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChosen = true;
  }
}
