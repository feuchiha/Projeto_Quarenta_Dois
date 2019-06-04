import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
declare var google: any;
@Component({
  selector: 'app-line',
  template: '<div #lineChart></div>',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements AfterViewInit {

  @ViewChild('lineChart') lineChart: ElementRef

  drawChart = () => {

    var data = google.visualization.arrayToDataTable([
      ['Year', 'Sales', 'Expenses'],
      ['2004',  1000,      400],
      ['2005',  1170,      460],
      ['2006',  660,       1120],
      ['2007',  1030,      540]
    ]);

    const options = {
      width: 500,
      height: 500,
      title: 'Company Performance',
      curveType: 'function',
      legend: { 
        position: 'bottom' },
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
    };

    const chart = new google.visualization.LineChart(this.lineChart.nativeElement);
    chart.draw(data, options);
  }

  ngAfterViewInit() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }

}
