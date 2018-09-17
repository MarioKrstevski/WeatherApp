import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { WeatherData } from '../../models/weather-data.model';
import { Coordinates } from '../../models/coordinates.model';

@Injectable({
    providedIn: 'root'
})
export class WeatherDataService {

    APIKey = 'e9bcc5bf1da279b293a5632b24e83da1'; // for OpenWeatherMap

    constructor(private http: Http) { }

    getWeather(city: string): Observable<WeatherData> {
        if (!city.trim()) {
            return (new Observable<WeatherData>());
        }

        return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${this.APIKey}`)
            .pipe(map(resp => resp.json()),
                catchError(this.errorHandler));
    }

    getCitiesInRange(SouthWestLongitude: number, SouthWestLatitude: number, NorthEastLongitude: number, NorthEastLatitude: number, mapZoom: number = 6) {
        // console.log(`http://api.openweathermap.org/data/2.5/box/city?bbox=${SWlon},${SWlat},${NElon},${NElat},${mapZoom}&cluster=yes&APPID=${this.APIKey}`);
        return this.http.get(`https://api.openweathermap.org/data/2.5/box/city?bbox=${SouthWestLongitude},${SouthWestLatitude},${NorthEastLongitude},${NorthEastLatitude},${mapZoom}&cluster=yes&APPID=${this.APIKey}`)
            .pipe(map(resp => resp.json()));
    }

    getAirPolution(cityCoords: Coordinates, datetime: string = 'current') {
        return this.http.get(`https://api.openweathermap.org/pollution/v1/co/${cityCoords.lat.toFixed(6).slice(0, -7)},${cityCoords.lon.toFixed(6).slice(0, -7)}/${datetime}.json?appid=${this.APIKey}`)
            .pipe(map(resp => resp.json()));
    }

    errorHandler(error: HttpErrorResponse) {
        return throwError(error.message || "The city with the name xyz does not exist!");
    }


}
