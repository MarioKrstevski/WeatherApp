import { Component, OnInit } from "@angular/core";

import { PagerService } from "../services/pager.service";
import { WeatherDataService } from "../services/weather-data.service";
import { DataSharingService } from "../services/data-sharing.service";

import * as i from "../../interaces/weatherdata";

@Component({
  selector: "app-browse-cities",
  templateUrl: "./browse-cities.component.html",
  styleUrls: ["./browse-cities.component.css"]
})
export class BrowseCitiesComponent implements OnInit {
  dummyUrl = "./assets/dummy-data.json";
  urlForEurope = "http://api.openweathermap.org/dfata/2.5/box/city?bbox=12,32,15,37,10";
  private cities: i.IWeatherInfo[];

  // pager object
  pager: any = {};

  pagedCities: any[];

  showSpinner = true;
  fakeInfo: i.IWeatherInfo;
  currentCity: string = "";

  constructor(
    private dataSharingService: DataSharingService,
    private pagerService: PagerService,
    private weather: WeatherDataService
  ) {}

  ngOnInit() {
    this.weather.getCitiesInRange(-10,39.5,32,57.6).subscribe(citiesData => {
      this.showSpinner = false;
      this.cities = citiesData.list;

      //Adding extra empty objects to fill cities number to be % 5;
      let extra: number = 5 - (this.cities.length % 5);
      if (extra != 0) {
        while (extra) {
          this.cities.push(this.fakeInfo);
          extra--;
        }
      }

      //Sets first page of pagination
      this.setPage(1);
    });

    // Code if you want to work with locak json file instaed of API

    // this.http.get(this.dummyUrl)
    // .pipe(map((response: Response) => response.json()))
    // .subscribe(data => {
    //     // set items to json response
    //     this.cities = data;
    //     // initialize to page 1
    //     // console.log(this.setPage(1));
    //     this.setPage(1);h

    // });

    this.dataSharingService.newCity.subscribe(newCity => (this.currentCity = newCity));
  }

  newCity(city: string) {
       if (this.currentCity !== city && city !== null) { //city !== null covers the empty fields we add
      this.dataSharingService.changeCity(city);
      this.dataSharingService.turnOnSpinner();
      this.currentCity = city;
    } else {
      // Else, the same city is clicked and nothing will happen, to optimize performance
    }
  }
  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.cities.length, page);

    // get current page of items
    this.pagedCities = this.cities.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }
}
