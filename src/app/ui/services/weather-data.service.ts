import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  myKey = 'e9bcc5bf1da279b293a5632b24e83da1';
  weatherJson;
  
  constructor(private http: HttpClient) { 
    // this.weatherJson=this.http.get('http://jsonplaceholder.typicode.com/photos').subscribe( data => console.dir(data));
  
  }

  getWeather(city){

    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.myKey}`);
    
  }

}
