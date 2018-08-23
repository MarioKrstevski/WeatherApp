import { Component, OnInit, Output } from '@angular/core';
import { WeatherDataService } from '../ui/services/weather-data.service';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  // defaultCity: string='5128581';
  cityInfo:any;
  weekInfo:any;

  
  @Output() public weatherData = new EventEmitter();
 

  constructor(private weather: WeatherDataService) { }

  ngOnInit() {
    
  }

  prevDefault(event){
    event.preventDefault();
  }

  updateWeather(city){
    this.weather.getWeather(city).subscribe(newCityWeather => {
      // console.log('weather', newCityWeather);
      this.cityInfo=newCityWeather;
      // console.log(this.cityInfo);
      this.weatherData.emit(this.cityInfo);
      // console.log('Ova e child eventot',this.cityInfo);
    });
  }

}
