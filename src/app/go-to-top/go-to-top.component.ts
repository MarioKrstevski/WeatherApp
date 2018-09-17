import { Component, AfterViewInit, ViewChild, Renderer2, Inject } from '@angular/core';

import { WINDOW } from '../ui/services/window.service';

@Component({
    selector: 'app-go-to-top',
    templateUrl: './go-to-top.component.html',
    styleUrls: ['./go-to-top.component.css']
})
export class GoToTopComponent implements AfterViewInit {

    @ViewChild('goToTop') goToTop;

    constructor(private renderer: Renderer2, @Inject(WINDOW) private window: Window) { }

    ngAfterViewInit() {

        this.window.onscroll = () => {
            if (window.scrollY > 700) {
                this.renderer.removeClass(this.goToTop.nativeElement, 'hide');
            } else {
                this.renderer.addClass(this.goToTop.nativeElement, 'hide');
            }
        }
    }
}
