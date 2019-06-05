import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
declare var google: any;

@Component({
  selector: 'app-pie',
  template: '<div #pieChart></div>',
  styleUrls: ['./pie.component.css']
})

export class PieComponent implements OnInit { 
  arrData:any = [];
  arrCab: any = [];
  arrValues: any = [];

  @ViewChild('pieChart') pieChart: ElementRef

  constructor(private http: HttpClient, public toastr: ToastrManager) {
  }

  ngOnInit(): void {
    google.charts.load('current', { 'packages': ['corechart'] });
    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json')
    this.http.post(`http://localhost:3002/Mysql/pie`,{
      headers: headers
    })
    .subscribe(data => {
      console.log(data)
      for (const k in data) {
          const element = data[k];
          this.arrCab.push('10a14', 'Mortes'); //tentar mandar do back a legenda
          this.arrValues.push(('10a14'), parseInt(element['10a14']));
      }
      this.arrData.push(this.arrCab);
      this.arrData.push(this.arrValues);
      google.charts.setOnLoadCallback(this.drawChart);
    })
  }

  drawChart = () => {

    var data = google.visualization.arrayToDataTable(this.arrData);

  const options = {
    width: 500,
    height: 500,
    is3D: true,
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
    title: 'Obitos Anuais por Idades',
    legend: {position: 'top'}
  };

  const chart = new google.visualization.PieChart(this.pieChart.nativeElement);

  chart.draw(data, options);
}
}