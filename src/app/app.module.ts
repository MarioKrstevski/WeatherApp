import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule, routingComponents } from './app-routing.module'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GoToTopComponent } from './go-to-top/go-to-top.component';
import { ContactComponent } from './contact/contact.component';



import { UiModule } from './ui/ui.module';
// import { LayoutComponent } from './ui/layout/layout.component'

// const appRoutes: Routes = [
//   {path:'',component:LayoutComponent},
//   {path:'/contact',component:ContactComponent}
// ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GoToTopComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    UiModule,
    AppRoutingModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
