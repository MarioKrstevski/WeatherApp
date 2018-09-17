import { Component, OnInit } from '@angular/core';
import { LatLngBounds, LatLng } from '@agm/core'

import { WeatherDataService } from "../services/weather-data.service";
import { LatLngBoundsLiteral } from '@agm/core/services/google-maps-types';

import { SingleCity } from '../../models/single-city.model';
import { Coordinates } from '../../models/coordinates.model';

@Component({
    selector: 'app-interactive-map',
    templateUrl: './interactive-map.component.html',
    styleUrls: ['./interactive-map.component.css']
})
export class InteractiveMapComponent implements OnInit {

    // googleMapsAPIKey = 'AIzaSyC-UOu23S6rRvG4vbsbT9ps0U5tHsSgccA';
    lat = 49.305080095;
    lng = 11.106342880;
    mapZoom = 6;
    MapCenter: LatLng;
    cities: SingleCity[];

    SW: Coordinates = {
        lat: 37, //1
        lon: -7.7 //2
    }
    NE: Coordinates = {
        lat: 53, //3
        lon: 33 //4
    }

    mapBounds: LatLngBoundsLiteral = {
        east: this.NE.lon,
        north: this.NE.lat,
        south: this.SW.lat,
        west: this.SW.lon,
    };
    prevMapBounds = this.mapBounds;

    constructor(private weather: WeatherDataService) { }

    ngOnInit() {
    }

    updateMapZoom(newZoom) {
        console.log(newZoom);
        this.mapZoom = newZoom;
    }

    mapBoundsChanged(bounds: LatLngBounds) {
        let northEast: LatLng = bounds.getNorthEast();
        let southWest: LatLng = bounds.getSouthWest();
        let center: LatLng = bounds.getCenter();
        this.MapCenter = center;

        let newMapBounds: LatLngBoundsLiteral = {
            east: northEast.lng(),
            north: northEast.lat(),
            west: southWest.lng(),
            south: southWest.lat()
        };

        if (
            Math.abs(this.prevMapBounds.east - newMapBounds.east) > 3 ||
            Math.abs(this.prevMapBounds.west - newMapBounds.west) > 3 ||
            Math.abs(this.prevMapBounds.north - newMapBounds.north) > 2 ||
            Math.abs(this.prevMapBounds.south - newMapBounds.south) > 2) {
            this.weather.getCitiesInRange(newMapBounds.west, newMapBounds.south, newMapBounds.east, newMapBounds.north, this.mapZoom)
                .subscribe(citiesData => {
                    this.cities = citiesData.list;
                    console.log(this.cities);
                });

            this.prevMapBounds = newMapBounds;
        }
    }
}
