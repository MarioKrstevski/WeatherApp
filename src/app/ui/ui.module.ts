import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout/layout.component';
import { CityWeatherInfoComponent } from './city-weather-info/city-weather-info.component';
import { BrowseCitiesComponent } from './browse-cities/browse-cities.component';
import { InteractiveMapComponent } from './interactive-map/interactive-map.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LayoutComponent, 
    CityWeatherInfoComponent,
    BrowseCitiesComponent,
    InteractiveMapComponent,
    SearchBarComponent
  ],
  exports: [
    SearchBarComponent,
    LayoutComponent
  ]
})
export class UiModule { }
