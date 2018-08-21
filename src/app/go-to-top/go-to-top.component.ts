import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-go-to-top',
  templateUrl: './go-to-top.component.html',
  styleUrls: ['./go-to-top.component.css']
})
export class GoToTopComponent implements OnInit {


  constructor() { }

  ngOnInit() {
   
  }

  

  // $(window).scroll(function(){
	// 	if ($(this).scrollTop() > 300) { // 300px from top
  //   }

  /* This function was replaced with ngx-page-scroll */

  // goToTop(){
  //   const scrollToTop = () => {
  //     const c = document.documentElement.scrollTop || document.body.scrollTop;
  //     if (c > 0) {
  //       window.requestAnimationFrame(scrollToTop);
  //       window.scrollTo(0, c - c / 10);
  //     }
  //   };

  //   scrollToTop();
  //   console.log('Scrolled to top');
  //   }


  }