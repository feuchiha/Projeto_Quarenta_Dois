import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
declare var google: any;

@Component({
  selector: 'app-pie',
  template: '<div #pieChart></div>',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements AfterViewInit { 
  @ViewChild('pieChart') pieChart: ElementRef

  drawChart = () => {

  const data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Work', 5],
    ['Eat', 2],
    ['Commute', 8],
    ['Watch TV', 2],
    ['Sleep', 7]
  ]);

  const options = {
    title: 'My Daily Activities',
    legend: {position: 'top'}
  };

  const chart = new google.visualization.PieChart(this.pieChart.nativeElement);

  chart.draw(data, options);
}

  ngAfterViewInit() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }
}
