import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-browse-cities',
  templateUrl: './browse-cities.component.html',
  styleUrls: ['./browse-cities.component.css']
})
export class BrowseCitiesComponent implements OnInit {

  cities = [
      {
        name:'Berlin',
        temp:'23',
        humidity: '65',
        wind:'6'

      },
      {
        name:'Skopje',
        temp:'22',
        humidity: '35',
        wind:'19'

      },
      {
        name:'Kumanovo',
        temp:'26',
        humidity: '5',
        wind:'63'

      },
      {
        name:'Veles',
        temp:'24',
        humidity: '31',
        wind:'12'

      },
      {
        name:'Delchevo',
        temp:'21',
        humidity: '46',
        wind:'6'

      },
      {
        name:'Strumica',
        temp:'12',
        humidity: '42',
        wind:'3'

      },
      {
        name:'Tetovo',
        temp:'15',
        humidity: '35',
        wind:'6'

      },
      {
        name:'Pehchevo',
        temp:'223',
        humidity: '25',
        wind:'6'

      },
      {
        name:'Berovo',
        temp:'21',
        humidity: '35',
        wind:'4'

      },
      {
        name:'Prilep',
        temp:'21',
        humidity: '65',
        wind:'2'

      }
  ];

  constructor() { }

  ngOnInit() {
    
  }

}
