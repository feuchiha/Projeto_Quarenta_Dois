import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

declare var google: any;

@Component({
  selector: 'app-teste-filtro',
  templateUrl: './teste-filtro.component.html',
  styleUrls: ['./teste-filtro.component.css']
})
export class TesteFiltroComponent implements OnInit {
  arrData: any = [];
  Mas: any = [];
  Fem: any = [];
  filtro: any = [];
  chart: google.visualization.PieChart;

  constructor(private http: HttpClient, public toastr: ToastrManager) {
    // google.load("visualization", "1", {packages:["corechart"], "callback": this.drawChart});

    // google.charts.load('current', { 'packages': ['corechart'] });
    // google.setOnLoadCallback(this.drawChart);


  }

  @ViewChild('piechart') piechart: ElementRef

  ngOnInit(): void {

    console.log('passou aqui 1')
   
  }


  newMethod() {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Work', 11],
      ['Eat', 2],
      ['Commute', 2],
      ['Watch TV', 2],
      ['Sleep', 7]
    ]);
    var options = {
      chartArea: { width: '100%', height: '100%' },
      forceIFrame: 'false',
      is3D: true,
      pieSliceText: 'value',
      sliceVisibilityThreshold: 1 / 20,
      titlePosition: 'none'
    };
    this.chart.draw(data, options);
  }

  drawChart() {
    console.log('passou aqui 2')
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Work', 1],
      ['Eat', 22],
      ['Commute', 32],
      ['Watch TV', 42],
      ['Sleep', 75]
    ]);

    var options = {

      chartArea: { width: '100%', height: '100%' },

      forceIFrame: 'false',

      is3D: true,

      pieSliceText: 'value',

      sliceVisibilityThreshold: 1 / 20, // Only > 5% will be shown.

      titlePosition: 'none'

    };

    console.log('teste 1: ' + document.getElementById('piechart'));
    console.log(this.piechart);
    



    this.chart = new google.visualization.PieChart(this.piechart.nativeElement);
    console.log(this.chart);


    this.chart.draw(data, options);
  }

  initChart(): void {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.setOnLoadCallback(this.drawChart);
  }
}
