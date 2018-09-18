import { Component, HostListener, Inject, Renderer2, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { WINDOW } from '../ui/services/window.service';

@Component({
    selector: 'app-go-to-top', templateUrl: './go-to-top.component.html', styleUrls: ['./go-to-top.component.css']
})
export class GoToTopComponent {

    @ViewChild('goToTop') goToTop;

    constructor(private renderer: Renderer2, @Inject(WINDOW) private window: Window, @Inject(DOCUMENT) private document: Document) {
    }


    @HostListener('window:scroll', []) onWindowScroll() {
        const number = this.window.pageXOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
        if (number > 800) {
            this.renderer.removeClass(this.goToTop.nativeElement, 'hide');
        } else {
            this.renderer.addClass(this.goToTop.nativeElement, 'hide');
        }
    }
}
