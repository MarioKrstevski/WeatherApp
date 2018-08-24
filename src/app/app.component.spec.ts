import { TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { GoToTopComponent } from './go-to-top/go-to-top.component';
import { RouterTestingModule } from '@angular/router/testing';
import {NgxPageScrollModule} from 'ngx-page-scroll';  
import { FileSelectDirective } from 'ng2-file-upload';

describe('AppComponent', () => {
  let weatherData;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgxPageScrollModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        ContactComponent,
        GoToTopComponent,
        FileSelectDirective
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
      weatherData = {
        name: "New York",
        country: "US"
      }
  });




  it('should create the app', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.ngOnInit();
    
    tick(2000);


    expect(app.promenliva).toEqual(true);
// 
    // expect(app).toBeTruthy();
  }));


  it(`should have as title 'WeatherApp'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('WeatherApp');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to WeatherApp!');
  }));
});
