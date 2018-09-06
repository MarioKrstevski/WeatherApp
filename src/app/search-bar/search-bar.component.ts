import { Component,Input, OnInit, Output } from '@angular/core';
import { WeatherDataService } from '../ui/services/weather-data.service';

import { DataSharingService } from '../ui/services/data-sharing.service';

import { EventEmitter } from '@angular/core';



@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {


  @Output() public weatherData = new EventEmitter();
 
   
  cityInfo: any;
  weekInfo: any;
  errorMsg="" ;
  selectedCity = "New York";
    
  constructor(private weather: WeatherDataService, private dataService: DataSharingService) { }

  ngOnInit() {

    this.dataService.newCity.subscribe((newCity) => {
      if(this.selectedCity !== newCity){
      this.selectedCity = newCity;
      console.log('Smenet e selectedCity vo SearchBarComponent vo  ',this.selectedCity);
      }
    })
  }

  updateWeather(city: string){

    if (city.trim() == ""){
      return ;
    }

    if(this.selectedCity!==city){

      console.log('Se raboti za razlicen grad i KJE SE se povika api vo SBC', this.selectedCity);
      

    this.dataService.turnOnSpinner();

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
      this.dataService.turnOffSpinner();
    });

    this.selectedCity = city;
    }

    console.log('Se raboti za IST grad i N E M A se povika api vo SBC', this.selectedCity);



  }

}
