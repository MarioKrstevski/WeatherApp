import { Component, OnInit } from '@angular/core';
import { DateModel } from '../date-wraper.model';

import { DataSharingService } from '../services/data-sharing.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  // TODO: Remove commented things that are not needed here
  // TODO: Remove unused methods
  // TODO: Format code, add tabulation etc.
  currentDate: DateModel = new DateModel();

  constructor(private dataSharingService : DataSharingService) { }

  ngOnInit() {
    let now = new Date();
    this.currentDate.day = now.getDate();
    this.currentDate.month = now.getMonth()+1;
    this.currentDate.year = now.getFullYear();
  }
  updateDateTime(newDateTime){
    //we need to create a new instance/reference because the directory we are using
    //is returning a simple json object to us, and we need to cast it to our DateModel
    //so that it works nicely with the other components/function logic
    this.currentDate = new DateModel();
    this.currentDate.day = newDateTime.day;
    this.currentDate.month = newDateTime.month;
    this.currentDate.year = newDateTime.year;

    this.dataSharingService.turnOnSpinnerForAirPollution();
    this.dataSharingService.changeDateTime(this.currentDate.createDateString());
  }

  updateForCurrent(){
    this.dataSharingService.changeDateTime('current');
    this.dataSharingService.turnOnSpinnerForAirPollution();
  }

}
