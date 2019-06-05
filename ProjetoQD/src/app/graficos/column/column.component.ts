import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
declare var google: any;
@Component({
  selector: 'app-column',
  template: '<div #columnChart></div>',
  styleUrls: ['./column.component.scss']
})

export class ColumnComponent implements OnInit {
  arrData:any = [];
  arrCab: any = [];
  arrValues: any = [];
  @ViewChild('columnChart') columnChart: ElementRef


  constructor(private http: HttpClient, public toastr: ToastrManager) {
  }

  ngOnInit(): void {
    google.charts.load('current', { 'packages': ['corechart'] });
    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json')
    this.http.post(`http://localhost:3002/Mysql/column`,{
      headers: headers
    })
    .subscribe(data => {
      for (const k in data) {
          const element = data[k];
          this.arrCab.push( element['Regio']);
          this.arrValues.push([parseInt(element['M']), parseInt(element['F'])]);
      }
      this.arrData.push(this.arrCab);
      this.arrData.push(this.arrValues);
      google.charts.setOnLoadCallback(this.drawChart);
    })
  }

  drawChart = () => {
    var data = google.visualization.arrayToDataTable(this.arrData);
    var options = {
      width: 600,
      height: 400,
      legend: { position: 'top', maxLines: 3 },
      bar: { groupWidth: '75%' },
      isStacked: false,
    };
    const chart = new google.visualization.ColumnChart(this.columnChart.nativeElement);
    chart.draw(data, options);
  }

  ngAfterViewInit() {
   
  }
}