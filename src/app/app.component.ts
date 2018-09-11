import { Component, OnInit, AfterViewInit } from '@angular/core';

// import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{

  showSpinner: boolean = true;

  ngOnInit() {}

  ngAfterViewInit(){
    document.querySelector('#spinner').remove();
  }
}
