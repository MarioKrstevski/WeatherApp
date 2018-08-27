import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataSharingService {

  private defaultCity = new BehaviorSubject<string>('New York');
  newCity = this.defaultCity.asObservable();

  constructor() { }

  changeCity(city: string) {
  this.defaultCity.next(city);
  }
}
 