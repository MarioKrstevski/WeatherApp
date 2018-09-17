import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    toggleSideMenu(el) {
        let prop = el.style.height;
        prop === '250px' ? this.closeSideMenu(el) : this.openSideMenu(el);
    }
    closeSideMenu(el) {
        el.style.height = '0px';
    }
    openSideMenu(el) {
        el.style.height = '250px';
    }
}
