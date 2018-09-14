import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // TODO: Remove constructor and ngOnInit if you do not use them.
  // TODO: Remove commented things that are not needed here
  // TODO: Remove unused methods
  // TODO: Format code, add tabulation etc.

  constructor() { }

  ngOnInit() {}

  toggleSideMenu(el){
    let prop = el.style.height;
    prop === '250px' ? this.closeSideMenu(el) : this.openSideMenu(el);

  }
  closeSideMenu(el){
    el.style.height = '0px';
  }
  openSideMenu(el){
    el.style.height = '250px';
  }

}
