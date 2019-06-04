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

  const options = {
    title: 'My Daily Activities',
    legend: {position: 'top'}
  };

  const chart = new google.visualization.PieChart(this.pieChart.nativeElement);

  chart.draw(data, options);
}
}