import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

import { PagerService } from '../services/pager.service';
import { WeatherDataService } from '../services/weather-data.service';


@Component({
  selector: 'app-browse-cities',
  templateUrl: './browse-cities.component.html',
  styleUrls: ['./browse-cities.component.css']
})
export class BrowseCitiesComponent implements OnInit {

  
  dummyUrl = "./assets/dummy-data.json";
  urlForEurope = "http://api.openweathermap.org/dfata/2.5/box/city?bbox=12,32,15,37,10"
  private cities;
  // pager object
  pager: any = {};
  
  //paged cities

  pagedCities: any[];

  constructor(private http: Http, private pagerService : PagerService, private weather: WeatherDataService) { }
  
  ngOnInit() {
  
    this.weather.getCities(57,-11,36.6,25.5).subscribe( citiesData => {
      this.cities = citiesData.list;
      console.log("Gradovi", this.cities);
      let extra: number = (this.cities.length+1)%5;
      if(extra!=0){
        console.log('extra', extra);

      }
      

      this.setPage(1);
    })
    // this.http.get(this.dummyUrl)
    // .pipe(map((response: Response) => response.json()))
    // .subscribe(data => {
    //     // set items to json response
    //     this.cities = data;
    //     // initialize to page 1
    //     // console.log(this.setPage(1));
    //     this.setPage(1);
        
    // });
    
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.cities.length, page);

    // get current page of items
    this.pagedCities = this.cities.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

}
