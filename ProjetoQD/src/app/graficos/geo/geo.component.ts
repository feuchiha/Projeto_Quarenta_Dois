import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
declare var google: any;

@Component({
  selector: 'app-geo',
  template: '<div #geoChart></div>',
  styleUrls: ['./geo.component.scss']
})
export class GeoComponent implements  AfterViewInit{

  @ViewChild('geoChart') geoChart: ElementRef

  drawChart = () => {
    var data = google.visualization.arrayToDataTable([
      ['City',   'Population', 'Area'],
      ['Rome',      2761477,    1285.31],
      ['Milan',     1324110,    181.76],
      ['Naples',    959574,     117.27],
      ['Turin',     907563,     130.17],
      ['Palermo',   655875,     158.9],
      ['Genoa',     607906,     243.60],
      ['Bologna',   380181,     140.7],
      ['Florence',  371282,     102.41],
      ['Fiumicino', 67370,      213.44],
      ['Anzio',     52192,      43.43],
      ['Ciampino',  38262,      11]
    ]);
    var options = {
      width: 500,
      height: 500,
      region: 'IT',
      hAxis: {
        textStyle: {
            color: '#0baeb7'
        },
        titleTextStyle: {
            color: '#0baeb7'
        }
      },
      vAxis: {
          textStyle: {
              color: '#0baeb7'
          },
          titleTextStyle: {
              color: '#0baeb7'
          }
      },
      displayMode: 'markers',
      colorAxis: {colors: ['green', 'blue']}
    };

    const chart = new google.visualization.GeoChart(this.geoChart.nativeElement);
    chart.draw(data, options);
  }


  ngAfterViewInit() {
    google.charts.load('current', { 'packages': ['corechart'], 'mapsApiKey': 'AIzaSyAFETSaQLca2a7A2xHwltg9MnVEU7gCVB8' });
    google.charts.setOnLoadCallback(this.drawChart);
  }

}
