import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { LayoutComponent } from './layout/layout.component';
import { CityWeatherInfoComponent } from './city-weather-info/city-weather-info.component';
import { BrowseCitiesComponent } from './browse-cities/browse-cities.component';
import { InteractiveMapComponent } from './interactive-map/interactive-map.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

import { PagerService } from './services/pager.service';


@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [
    LayoutComponent, 
    CityWeatherInfoComponent,
    BrowseCitiesComponent,
    InteractiveMapComponent,
    WelcomeComponent,
    SearchBarComponent
  ],
  providers:[
    PagerService
  ],
  exports: [
    SearchBarComponent,
    LayoutComponent
  ]
})
export class UiModule { }
