import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  myKey = 'e9bcc5bf1da279b293a5632b24e83da1';
  weatherJson;
  
  constructor(private http: Http) {}

  getWeather(city: string){
    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${this.myKey}`)
    .pipe(map(resp => resp.json()),
     catchError(this.errorHandler));
  }

  getCities(alat: number,alon: number,blat: number,blon: number){
    return this.http.get(`http://api.openweathermap.org/data/2.5/box/city?bbox=${alat},${alon},${blat},${blon},10&cluster=no&APPID=${this.myKey}`)
    .pipe(map(resp => resp.json()));
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Unknown City")
  }
  

}
