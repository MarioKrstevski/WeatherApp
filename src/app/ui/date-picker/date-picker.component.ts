import { Component, OnInit } from '@angular/core';
import { DateModel } from '../dateModel';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  currentDate: DateModel = new DateModel();
  

  constructor() { }

  ngOnInit() {
    let now = new Date();
    
    this.currentDate.day = now.getDate();
    this.currentDate.month = now.getMonth()+1;
    this.currentDate.year = now.getFullYear();
    console.log('this is current date',this.currentDate);
  }

  

}
