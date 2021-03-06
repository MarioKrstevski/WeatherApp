import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser'
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { NgxPaginationModule } from 'ngx-pagination';
import { AgmOverlays } from "agm-overlays";
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { LayoutComponent } from './layout/layout.component';
import { CityWeatherInfoComponent } from './city-weather-info/city-weather-info.component';
import { BrowseCitiesComponent } from './browse-cities/browse-cities.component';
import { InteractiveMapComponent } from './interactive-map/interactive-map.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { AirPolutionComponent } from './air-polution/air-polution.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { SquareLoadingSpinnerComponent } from './square-loading-spinner/square-loading-spinner.component';
import { PulsatingDotLoadingSpinnerComponent } from './pulsating-dot-loading-spinner/pulsating-dot-loading-spinner.component';

import { WeatherDataService } from './services/weather-data.service';
import { DataSharingService } from './services/data-sharing.service';
import { MyMarkerComponent } from './interactive-map/my-marker/my-marker.component';
import { WINDOW_PROVIDERS } from './services/window.service';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        NgbModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyC-UOu23S6rRvG4vbsbT9ps0U5tHsSgccA'
        }),
        AgmSnazzyInfoWindowModule,
        BrowserModule,
        AgmOverlays,
        AgmJsMarkerClustererModule,
        NgxPaginationModule,
        BrowserAnimationsModule
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
        SquareLoadingSpinnerComponent,
        PulsatingDotLoadingSpinnerComponent,
        MyMarkerComponent,
    ],
    providers: [
        WeatherDataService,
        DataSharingService,
        WINDOW_PROVIDERS
    ],
    exports: [
        SearchBarComponent,
        LayoutComponent,
        SquareLoadingSpinnerComponent
    ]
})

export class UiModule { }
