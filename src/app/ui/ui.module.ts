import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';

import { LayoutComponent } from './layout/layout.component';
import { CityWeatherInfoComponent } from './city-weather-info/city-weather-info.component';
import { BrowseCitiesComponent } from './browse-cities/browse-cities.component';
import { InteractiveMapComponent } from './interactive-map/interactive-map.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { AirPolutionComponent } from './air-polution/air-polution.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

import { PagerService } from './services/pager.service';
import { WeatherDataService } from './services/weather-data.service';
import { DataSharingService } from './services/data-sharing.service';
import { SecondaryLoadingSpinnerComponent } from './secondary-loading-spinner/secondary-loading-spinner.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC-UOu23S6rRvG4vbsbT9ps0U5tHsSgccA'
    })
  ],
  declarations: [
    LayoutComponent,
    CityWeatherInfoComponent,
    BrowseCitiesComponent,
    InteractiveMapComponent,
    WelcomeComponent,
    SearchBarComponent,
    AirPolutionComponent,
    DatePickerComponent,
    LoadingSpinnerComponent,
    SecondaryLoadingSpinnerComponent
  ],
  providers:[
    PagerService,
    WeatherDataService,
    DataSharingService
  ],
  exports: [
    SearchBarComponent,
    LayoutComponent,
    LoadingSpinnerComponent
  ]
})

export class UiModule { }
