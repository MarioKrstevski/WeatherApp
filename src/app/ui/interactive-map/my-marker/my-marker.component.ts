import { Component, Input, OnInit } from '@angular/core';
import * as i from "../../../interaces/weatherdata";

@Component({
  selector: 'app-my-marker',
  templateUrl: './my-marker.component.html',
  styleUrls: ['./my-marker.component.css']
})
export class MyMarkerComponent implements OnInit {
  // TODO: Remove constructor and ngOnInit if you do not use them.
  // TODO: Remove commented things that are not needed here
  // TODO: Format code, add tabulation etc.

  constructor() { }

  @Input() displayInfo: i.ISingeCity;
  isClicked = false;

  ngOnInit() {
  }

  isClickedToggle(){
    event.stopPropagation();

    this.isClicked=!this.isClicked;
    console.log('click changed', this.isClicked);

  }

}
