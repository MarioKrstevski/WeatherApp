import { Component, OnInit, ViewChild } from '@angular/core';
import { AgmMap, LatLngBounds, LatLng } from '@agm/core'

import { WeatherDataService } from "../services/weather-data.service";
import { google, LatLngLiteral, LatLngBoundsLiteral } from '@agm/core/services/google-maps-types';
import { ISingeCity } from '../../interaces/weatherdata';
import * as i from '../../interaces/weatherdata';

@Component({
  selector: 'app-interactive-map',
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.css']
})
export class InteractiveMapComponent implements OnInit {
  // googleMapsAPIKey = 'AIzaSyC-UOu23S6rRvG4vbsbT9ps0U5tHsSgccA';
  lat = 49.305080095;
  lng = 11.106342880;
  mapZoom = 5;
  cities: ISingeCity[] ;

  //************ 34
  //*            *
  //*            *
  //12 ***********
  // 12,32,15,37
  SW : i.ICoord = {
    lat: 37, //1
    lon: -7.7 //2
  }

  // 12  = SW south west DOLE LEVO
  NE : i.ICoord = {
    lat: 53, //3
    lon: 33 //4
  }
  mapBounds : LatLngBoundsLiteral = {
    east: this.NE.lon,
    north: this.NE.lat,
    south: this.SW.lat,
    west: this.SW.lon,
  };

  SWcurrent = {
    lat: 0,
    lon: 0
  }
  NEcurrent = {
    lat: 0,
    lon: 0
  }
  // 34 = NE north east GORE DESNO

  // @ViewChild('AgmMap') agmMap: AgmMap;
  constructor(private weather: WeatherDataService) {}

  ngOnInit() {
    this.weather.getCitiesInRange(this.SW.lon,this.SW.lat,this.NE.lon,this.NE.lat).subscribe(citiesData => {
      this.cities = citiesData.list;
    });

    console.log(this.mapBounds);

  }

  // ngAfterViewInit() {
  //   console.log('mapata',this.agmMap);
  // }
  logZoom(zoom){
    console.log('Ova e zoomot current',zoom);
  }

  mapBoundsChanged(bounds: LatLngBounds) {
    // console.log(bounds);
    let northEast: LatLng = bounds.getNorthEast();
    let southWest: LatLng = bounds.getSouthWest();
    let center: LatLng = bounds.getCenter();

    this.NEcurrent.lon = northEast.lng();
    this.NEcurrent.lat = northEast.lat();

    this.SWcurrent.lon = southWest.lng();
    this.SWcurrent.lat = southWest.lat();


    console.log("NORTH EAST", northEast.lat(), northEast.lng());
    console.log("SOUTH WEST", southWest.lat(), southWest.lng());
    // console.log("NE", northEast, "SW", southWest, "CENTER", center);
    console.log("center coords", center.lat() , center.lng());

  }

}
