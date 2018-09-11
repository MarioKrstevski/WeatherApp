import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { UiModule } from './ui/ui.module';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GoToTopComponent } from './go-to-top/go-to-top.component';
import { ContactComponent } from './contact/contact.component';

import {NgxPageScrollModule} from 'ngx-page-scroll';
import { FileSelectDirective } from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GoToTopComponent,
    ContactComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    UiModule,
    AppRoutingModule,
    NgxPageScrollModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
