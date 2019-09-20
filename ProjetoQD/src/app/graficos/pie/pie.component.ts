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
  filtros = {genero:"", mes:"", faixaEtaria:"", ano:""};
  arrData:any = [];
  Mas: any = [];
  Fem: any = [];

  @ViewChild('pieChart') pieChart: ElementRef

  constructor(private http: HttpClient, public toastr: ToastrManager) {
  }

  ngOnInit(): void {

    this.filtros = {
      genero: " Masc",
      mes: "Jan",
      faixaEtaria: " 30 a 39 anos",
      ano: "2018"
    }

    google.charts.load('current', { 'packages': ['corechart'] });
    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json')
    this.http.post(`http://localhost:3002/index/pie`,
    JSON.stringify(this.filtros),{
      headers: headers
    })
    .subscribe(data => {
    this.arrData.push(['Região' , 'Obitos']);
      for(let obj in data['data']){
            this.Mas.push(data['data'][obj]['regio']);
            this.Fem.push(data['data'][obj]['bitos']);
      }
      for(var i = 0; i < this.Mas.length; i++){
        this.arrData.push([this.Mas[i], parseInt(this.Fem[i])]);
      }
      //console.log(this.Fem);
      //console.log(this.arrData);
      google.charts.setOnLoadCallback(this.drawChart);
    })
  }

  drawChart = () => {

    var data = google.visualization.arrayToDataTable(this.arrData);
  const options = {
    width: 1200,
    height: 520,
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
    title: 'Obitos do sexo feminino em 2013 todas as Idades por região',
    legend: {position: 'bottom'},
    chartArea:{left:'12%',top:'10%',width:'65%',height:'75%'}
  };

  const chart = new google.visualization.PieChart(this.pieChart.nativeElement);

  chart.draw(data, options);
}

}