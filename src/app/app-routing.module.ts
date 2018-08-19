import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { LayoutComponent } from './ui/layout/layout.component';

const routes: Routes = [
    {path:'',component:LayoutComponent },
    {path:'contact',component:ContactComponent}
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }

export const routingComponents = [
    ContactComponent,
    LayoutComponent
];