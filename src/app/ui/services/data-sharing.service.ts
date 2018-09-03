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


  constructor() { }

  changeCity(city: string) {
    this.defaultCity.next(city);
  }

  changeCoords(coords: i.ICoord){
    this.defaultCoords.next(coords);
  }
}
 