import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
declare var google: any;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-geo',
  template: '<div #geoChart></div>',
  styleUrls: ['./geo.component.scss']
})
export class GeoComponent implements OnInit{

  arrData:any = [];
  arrCab: any = [];
  arrValues: any = [];

  @ViewChild('geoChart') geoChart: ElementRef

  constructor(private http: HttpClient, public toastr: ToastrManager) {
  }

  ngOnInit(): void {
    google.charts.load('current', { 'packages':['geochart'], 'mapsApiKey': 'AIzaSyBVSTOIEEgYfQXgDmSby4jPOfLTR-vG4WA'  });
    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json')
    this.http.post(`http://localhost:3002/Mysql/geo`,{
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
    var options = {
      region: 'IT',
      displayMode: 'markers',
      colorAxis: {colors: ['green', 'blue']}
    };

    const chart = new google.visualization.GeoChart(this.geoChart.nativeElement);
    chart.draw(data, options);
  }

}
