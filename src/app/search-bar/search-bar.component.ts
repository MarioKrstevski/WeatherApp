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
  cityInfo: any = null;

  @Output()
  public childEvent = new EventEmitter();

  constructor(private weather: WeatherDataService) { }

  ngOnInit() {
    
  }

  prevDefault(event){
    event.preventDefault();
  }

  updateWeather(city){
    // this.cityInfo=this.weather.getWeather(city);
    // console.log ' City Selected : ', city);
    this.weather.getWeather(city).subscribe((weather) => {
      console.log('weather', weather);
    })
  }

  fireEvent(){
    this.childEvent.emit(this.cityInfo);
    // console.log('Event Fired', this.cityInfo.name);
  }

}
