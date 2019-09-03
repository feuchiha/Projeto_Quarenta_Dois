import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { stringify } from '@angular/compiler/src/util';
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
  Mas: any = [11,66,86,55,23,241,10,60,68,30,189];
  Fem: any = [21, 96, 114, 42, 39, 288, 18,59, 90, 30, 14, 30];
  ano: any = ['1', '2', '3', '4', '5', '6','7','8','9','10','11','12'];

  @ViewChild('lineChart') lineChart: ElementRef

  constructor(private http: HttpClient, public toastr: ToastrManager) {
  }

  ngOnInit(): void {
        google.charts.load('current', { 'packages': ['corechart'] });
        /*
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json')
        this.http.post(`http://localhost:3002/index/bases`,{
          headers: headers
        })
        .subscribe(data => {

        this.arrData.push(['Regiao', 'Atual', 'Preditado']);
          for(let obj in data['data']){
            if(data['data'][obj]['Regi?o'] === "total" && data['data'][obj]['Genero'] === "Mas"){
              this.ano.push(data['data'][obj]['Ano']);
          }
              if(data['data'][obj]['Regi?o'] === "total" ){
                  if(data['data'][obj]['Genero'] === "Mas"){
                    this.Mas.push(data['data'][obj]['?bitos']);
                  }else{
                    this.Fem.push(data['data'][obj]['?bitos']);
                  }     

              
            }
          }
          */
         this.arrData.push(['Regiao', 'Atual', 'Preditado']);
          for(var i = 0;i < this.ano.length; i++){
            this.arrData.push([stringify(this.ano[i]), parseInt(this.Mas[i]), parseInt(this.Fem[i])]);
          }
          google.charts.setOnLoadCallback(this.drawChart);
          //console.log(this.arrData)
        //})
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
    const options = {      width: 500,
      height: 500,
      title: 'Generos dos Obitos por Dia de Permanencia Internados',
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