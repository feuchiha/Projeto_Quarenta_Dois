import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

declare var google: any;
@Component({
  selector: 'app-column',
  template: '<div #columnChart></div>',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements AfterViewInit {

  @ViewChild('columnChart') columnChart: ElementRef

  drawChart = () => {
    var data = google.visualization.arrayToDataTable([
      ['Genre', 'Fantasy & Sci Fi', 'Romance', 'Mystery/Crime', 'General',
       'Western', 'Literature', { role: 'annotation' } ],
      ['2010', 10, 24, 20, 32, 18, 5,  ''],
      ['2020', 16, 22, 23, 30, 16, 9, ''],
      ['2030', 28, 19, 29, 30, 12, 13, ''], 
    ]);
    var options = {
      width: 500,
      height: 500,
      title: 'Filmes',
      // backgroundColor: 'white',
      legend: { position: 'top', maxLines: 3},
      bar: { groupWidth: '75%' },
      isStacked: false,
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
    const chart = new google.visualization.ColumnChart(this.columnChart.nativeElement);
    chart.draw(data, options);
  }

  ngAfterViewInit() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }
}
