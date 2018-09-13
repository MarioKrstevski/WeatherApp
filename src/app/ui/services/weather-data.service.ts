import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import * as i from "../../interaces/weatherdata";

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  APIKey = 'e9bcc5bf1da279b293a5632b24e83da1'; // for

  constructor(private http: Http) {}

  getWeather(city: string): Observable<i.IWeatherData> {
    if (!city.trim()){
      return (new Observable<i.IWeatherData>());
    }
    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${this.APIKey}`)
    .pipe(map(resp => resp.json()),
     catchError(this.errorHandler));
  }

  getCitiesInRange(SWlon: number, SWlat: number, NElon: number, NElat: number, mapZoom: number = 6){
    // console.log(`http://api.openweathermap.org/data/2.5/box/city?bbox=${SWlon},${SWlat},${NElon},${NElat},${mapZoom}&cluster=yes&APPID=${this.APIKey}`);

    return this.http.get(`http://api.openweathermap.org/data/2.5/box/city?bbox=${SWlon},${SWlat},${NElon},${NElat},${mapZoom}&cluster=yes&APPID=${this.APIKey}`)
    .pipe(map(resp => resp.json()));
  }
  getAirPolution(cityCoords: i.ICoord, datetime: string){
    return this.http.get(`http://api.openweathermap.org/pollution/v1/co/${cityCoords.lat.toFixed(6).slice(0,-5)},${cityCoords.lon.toFixed(6).slice(0,-5)}/${datetime}.json?appid=${this.APIKey}`)
    .pipe(map(resp => resp.json()));
  }
  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "The city with the name xyz does not exist!");
  }


}
