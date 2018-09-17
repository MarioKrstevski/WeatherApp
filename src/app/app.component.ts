import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

    showSpinner: boolean = true;

    ngAfterViewInit() {
        // TODO: Do not use query selector. Read about view child. If you are only just removing the element then don't add it to the HTML
        document.querySelector('#spinner').remove();

        // Do not query selector the item, instead try to reference it via a ViewChild and use that nativeElement instead
        window.onscroll = () => {
            if (window.scrollY > 800) {
                document.querySelector("#goToTop").classList.remove('hide');
            } else {
                document.querySelector("#goToTop").classList.add('hide');
            }
        }
    }
}
