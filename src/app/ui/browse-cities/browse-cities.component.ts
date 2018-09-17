import { Component, OnInit } from "@angular/core";

import { PagerService } from "../services/pager.service";
import { WeatherDataService } from "../services/weather-data.service";
import { DataSharingService } from "../services/data-sharing.service";

import { WeatherInfo } from "../../models/weather-info.model";
import { WeatherData } from "../../models/weather-data.model";

@Component({
    selector: "app-browse-cities",
    templateUrl: "./browse-cities.component.html",
    styleUrls: ["./browse-cities.component.css"]
})
export class BrowseCitiesComponent implements OnInit {

    urlForEurope: string = "http://api.openweathermap.org/dfata/2.5/box/city?bbox=12,32,15,37,10";

    private cities: WeatherInfo[];

    // pager object
    pager: any = {};
    pagedCities: WeatherInfo[];

    showSpinner: boolean = true;
    fakeInfo: WeatherInfo;
    currentCity: string = "";

    constructor(private dataSharingService: DataSharingService, private pagerService: PagerService, private weather: WeatherDataService) { }

    ngOnInit() {

        //The range is for a square on the map that contains Europe
        this.weather.getCitiesInRange(-10, 39.5, 32, 57.6).subscribe((citiesData: WeatherData) => {
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

        this.dataSharingService.newCity.subscribe((newCity: string) => (this.currentCity = newCity));
    }

    newCity(city: string) {
        if (this.currentCity !== city && city !== null) { //city !== null covers the empty fields we add
            this.dataSharingService.changeCity(city);
            this.dataSharingService.turnOnSpinner();
            this.currentCity = city;
        } else {
            // Else, the same city is clicked and nothing will happen, to optimize for performance
        }
    }
    setPage(page: number) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.cities.length, page);

        // get current page of cities
        this.pagedCities = this.cities.slice(
            this.pager.startIndex,
            this.pager.endIndex + 1
        );
    }
}
