import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import * as i from "../../interaces/weatherdata";

@Injectable({
  providedIn: 'root'
})

export class DataSharingService {

  private defaultCity = new BehaviorSubject<string>('New York');
  newCity = this.defaultCity.asObservable();

  private defaultCoords = new BehaviorSubject({
    lat: -74.2121,
    lon: 40.7306
  });
  newCoords = this.defaultCoords.asObservable();

  private defaultDateTime = new BehaviorSubject<string>(new Date().toLocaleDateString());
  newDateTime = this.defaultDateTime.asObservable();

  private toggleSpinner = new BehaviorSubject<boolean>(false);
  newSpinnerToggle = this.toggleSpinner.asObservable();

  private toggleSpinnerForAirPollution = new BehaviorSubject<boolean>(false);
  newSpinnerToggleForAirPollution = this.toggleSpinnerForAirPollution.asObservable();

  constructor() { }

  turnOnSpinner(){
    this.toggleSpinner.next(true);
  }
  turnOffSpinner(){
    this.toggleSpinner.next(false);
  }
  turnOnSpinnerForAirPollution(){
    this.toggleSpinnerForAirPollution.next(true);
  }
  turnOffSpinnerForAirPollution(){
    this.toggleSpinnerForAirPollution.next(false);
  }

  changeCity(city: string) {
    this.defaultCity.next(city);
  }
  changeCoords(coords: i.ICoord){
    this.defaultCoords.next(coords);
  }
  changeDateTime(dateTime: string){
    this.defaultDateTime.next(dateTime);
  }
}
