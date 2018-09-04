import { Component, OnInit } from '@angular/core';
import { DateModel } from '../dateModel';

import { DataSharingService } from '../services/data-sharing.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  currentDate: DateModel = new DateModel();
  

  constructor(private dataSharing : DataSharingService) { }

  ngOnInit() {
    let now = new Date();
    
    this.currentDate.day = now.getDate();
    this.currentDate.month = now.getMonth()+1;
    this.currentDate.year = now.getFullYear();

    console.log('this is current date',this.currentDate);
  }

  updateDateTime(newDateTime){
    this.currentDate = new DateModel();

    this.currentDate.day = newDateTime.day;
    this.currentDate.month = newDateTime.month;
    this.currentDate.year = newDateTime.year;

    this.dataSharing.changeDateTime(this.currentDate.createDateString());
  }

  updateForCurrent(){
    this.dataSharing.changeDateTime('current');
  }

}
