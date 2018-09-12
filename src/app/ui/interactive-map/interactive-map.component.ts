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

  constructor(private weather: WeatherDataService) {}

  ngOnInit() {
    this.weather.getCitiesInRange(-10,39.5,32,57.6).subscribe(citiesData => {
      this.cities = citiesData.list;
    });
  }

  onChoseLocation(eve) {
    event.preventDefault();
    event.stopPropagation();

    console.log(eve);

    this.lat = eve.coords.lat;
    this.lng = eve.coords.lng;
    this.locationChosen = true;
  }

  toggleMoreInfo(event, moreInfoElement){

    event.stopPropagation();
    // let eleme = document.getElementsByClassName("moreInfo");
    // eleme.forEach((element) => {
      //   element.style.color = 'red';
      // });
      // console.log(eleme);
      let b:any = document.getElementById('goToTop');
      let a: any = document.getElementsByClassName('moreInfo')[0];
      moreInfoElement.style.color = 'red';


  }
  log(){
    console.log('kliknat sum');

  }
}
