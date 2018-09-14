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
    // TODO: Do not use query selector. Read about view child. If you are only just removing the element then don't add it to the HTML
    document.querySelector('#spinner').remove();

    // TODO: DO not ever use function() in Typescript because you lose your context and "this" is no longer available
    // You should use () => { } instead of function() { }
    // Do not query selector the item, instead try to reference it via a ViewChild and use that nativeElement instead
    // Properly format the code EVERYWHERE
    window.onscroll = function(){
      if(window.scrollY > 800){
          document.querySelector("#goToTop").classList.remove('hide');
      } else {
         document.querySelector("#goToTop").classList.add('hide');
      }
    }
  }
}
