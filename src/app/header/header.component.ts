import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  displaySideMenu(el){
    let prop=el.style.height;
    
    if(prop === '250px'){
      el.style.height='0px';
    } 
    else{
      el.style.height='250px';
    }
  }
}
