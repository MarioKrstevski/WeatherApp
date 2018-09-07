import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import * as i from "../../interaces/weatherdata";
// i above stands for interfaces

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  myKey = 'e9bcc5bf1da279b293a5632b24e83da1';
  weatherJson;

  constructor(private http: Http) {}

  getWeather(city: string): Observable<i.IWeatherData> {
    if (!city.trim()){
      return (new Observable<i.IWeatherData>());
    }

    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${this.myKey}`)
    .pipe(map(resp => resp.json()),
     catchError(this.errorHandler));
  }

  getCities(lonLeft: number,LatBottom: number,LonRight: number,LatTop: number){
    return this.http.get(`http://api.openweathermap.org/data/2.5/box/city?bbox=${lonLeft},${LatBottom},${LonRight},${LatTop},6&cluster=yes&APPID=${this.myKey}`)
    .pipe(map(resp => resp.json()));
  }
  getAirPolutionForCoords(cityCoords: i.ICoord, datetime: string){

    // console.log(`http://api.openweathermap.org/pollution/v1/co/${cityCoords.lat.toFixed(6).slice(0,-5)},${cityCoords.lon.toFixed(6).slice(0,-5)}/${datetime}.json?appid=${this.myKey}`);

    return this.http.get(`http://api.openweathermap.org/pollution/v1/co/${cityCoords.lat.toFixed(6).slice(0,-5)},${cityCoords.lon.toFixed(6).slice(0,-5)}/${datetime}.json?appid=${this.myKey}`)
    .pipe(map(resp => resp.json()));
  }
  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "The city with the name xyz does not exist!");
  }


}
