import { Component, OnInit, Output } from '@angular/core';
import { WeatherDataService } from '../ui/services/weather-data.service';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {


  @Output() public weatherData = new EventEmitter();
 
   
  cityInfo:any;
  weekInfo:any;
  errorMsg="";
    
  constructor(private weather: WeatherDataService) { }

  ngOnInit() {
    
  }

  updateWeather(city){
    this.weather.getWeather(city).subscribe(newCityWeather => {
      // console.log('weather', newCityWeather);
      this.cityInfo=newCityWeather;
      // console.log(this.cityInfo);
      this.weatherData.emit(this.cityInfo);
      this.errorMsg = "";
      // console.log('Ova e child eventot',this.cityInfo);
    },
    error => {
      this.errorMsg = error.replace('xyz',city);
    });
  }

}
