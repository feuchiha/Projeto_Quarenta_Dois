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
  Mas: any = [];
  Fem: any = [];

  @ViewChild('pieChart') pieChart: ElementRef

  constructor(private http: HttpClient, public toastr: ToastrManager) {
  }

  ngOnInit(): void {
    google.charts.load('current', { 'packages': ['corechart'] });
    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json')
    this.http.post(`http://localhost:3002/index/bases`,{
      headers: headers
    })
    .subscribe(data => {
    this.arrData.push(['Masculino' , 'Feminino']);
      for(let obj in data['data']){
          if(data['data'][obj]['Regi?o'] != "total" ){
              if(data['data'][obj]['Ano'] === "2013"){
              if(data['data'][obj]['Genero'] === "Mas"){
                this.Mas.push(data['data'][obj]['Regi?o']);
              }else{
                this.Fem.push(data['data'][obj]['?bitos']);
              }        
            }    
          }
      }
      for(var i = 0;i < this.Fem.length; i++){
        this.arrData.push([this.Mas[i], parseInt(this.Fem[i])]);
      }
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