import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
declare var google: any;

@Component({
  selector: 'app-line',
  template: '<div #lineChart></div>',
  styleUrls: ['./line.component.scss']
})

export class LineComponent implements OnInit {
  ages:any = [];
  arrData:any = [];
  arrCab: any = [];
  arrValues: any = [];

  @ViewChild('lineChart') lineChart: ElementRef

  constructor(private http: HttpClient, public toastr: ToastrManager) {
  }

  ngOnInit(): void {
    google.charts.load('current', { 'packages': ['corechart'] });
    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json')
    this.http.post(`http://localhost:3002/Mysql/line`,{
      headers: headers
    })
    .subscribe(data => {
      for (const k in data) {
          const element = data[k];
          this.arrCab.push('Faixa Etaria' , 'Homens' , 'Mulheres');
          this.arrValues.push(('10a14') ,(element['M']) , (element['F']));
      }
      this.arrData.push(this.arrCab);
      this.arrData.push(this.arrValues);
      google.charts.setOnLoadCallback(this.drawChart);
    })
  }

  Selectages(): void {
    google.charts.load('current', { 'packages': ['corechart'] });
    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json')
    this.http.post(`http://localhost:3002/Mysql/ages`,{
      headers: headers
    })
    .subscribe(data => {
      for (const k in data) {
        const element = data[k];
        this.ages.push((element['idades']));
      }
    })
  }

  drawChart = () => {
    var data = google.visualization.arrayToDataTable(this.arrData);
    const options = {
      title: 'Company Performance',
      curveType: 'function',
      legend: { 
        position: 'bottom' }
    };

    const chart = new google.visualization.LineChart(this.lineChart.nativeElement);
    chart.draw(data, options);
  }

}