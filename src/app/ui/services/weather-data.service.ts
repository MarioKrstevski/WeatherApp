import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  myKey = 'e9bcc5bf1da279b293a5632b24e83da1';
  weatherJson;
  
  constructor(private http: Http) {}

  getWeather(city){
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.myKey}`)
    .pipe(map(resp => resp.json()));;
    
  }

}
