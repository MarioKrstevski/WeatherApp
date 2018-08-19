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
     this.closeSideMenu(el);
    } 
    else{
      this.openSideMenu(el);
     
    }
  }
 closeSideMenu(el){
  el.style.height='0px';
 }
 openSideMenu(el){
  el.style.height='250px';
 }

}
