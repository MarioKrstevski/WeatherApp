import { Component, OnInit } from '@angular/core';
import { WeatherDataService  } from './ui/services/weather-data.service';
import { Event, Router, NavigationStart, NavigationCancel, NavigationEnd, NavigationError} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // showSpinner: boolean = true;

  // constructor(private router: Router){
  //   this.router.events.subscribe((routerEvent: Event) => {
  //     if(routerEvent instanceof NavigationStart){
  //       this.showSpinner = true;
  //     }

  //     if ( routerEvent instanceof NavigationEnd ||
  //          routerEvent instanceof NavigationCancel ||
  //          routerEvent instanceof NavigationError){
  //            this.showSpinner = false;
  //          }
  //   })
  // }

  ngOnInit() {
   
  }
}
