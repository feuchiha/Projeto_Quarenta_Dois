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
          this.arrCab.push( element['Regio']);
          this.arrValues.push([parseInt(element['M']), parseInt(element['F'])]);
      }
      this.arrData.push(this.arrCab);
      this.arrData.push(this.arrValues);
      console.log(this.arrData)
      google.charts.setOnLoadCallback(this.drawChart);
    })
  }

  drawChart = () => {
    var data = google.visualization.arrayToDataTable(this.arrData);
    const options = {      width: 500,
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

}