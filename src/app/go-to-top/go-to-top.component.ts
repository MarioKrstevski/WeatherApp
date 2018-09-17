import { Component, AfterViewInit, ViewChild, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-go-to-top',
    templateUrl: './go-to-top.component.html',
    styleUrls: ['./go-to-top.component.css']
})
export class GoToTopComponent implements AfterViewInit {

    @ViewChild('goToTop') goToTop;

    constructor(private renderer: Renderer2) { }

    ngAfterViewInit() {


        window.onscroll = () => {
            if (window.scrollY > 700) {
                this.renderer.removeClass(this.goToTop.nativeElement, 'hide');
                // this.goToTop.nativeElement.classList.remove('hide');
            } else {
                this.renderer.addClass(this.goToTop.nativeElement, 'hide');
                // this.goToTop.nativeElement.classList.add('hide');
            }
        }
    }
}
