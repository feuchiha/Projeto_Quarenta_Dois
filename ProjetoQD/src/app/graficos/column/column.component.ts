import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { stringify } from '@angular/compiler/src/util';
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
  masNorte: any = [];
  masNordeste: any = [];
  masSudeste: any = [];
  masSul: any = [];
  masCentro: any[];
  femNorte: any = [];
  Fem: any = ""; 
  Regiao: any = [];

  @ViewChild('columnChart') columnChart: ElementRef


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
    this.arrData.push(['Região', 'Homens' , 'Mulheres']);
      for(let obj in data['data']){
        if(data['data'][obj]['Ano'] === "2013" && data['data'][obj]['Genero'] === "Mas" ){
          this.Regiao.push(data['data'][obj]['Regi?o']);
        }
          if(data['data'][obj]['Genero'] === "Mas"){
            this.masNorte.push(data['data'][obj]['?bitos']);
        }else if(data['data'][obj]['Genero'] === "Fem"){
            this.femNorte.push(data['data'][obj]['?bitos']);
        }
    }
       /*  
        if(data['data'][obj]['Regi?o'] != "total" ){
              if(data['data'][obj]['Genero'] === "Mas" && data['data'][obj]['Genero'] != undefined ){
                this.Mas += data['data'][obj]['?bitos'] + ",";
              }else if(data['data'][obj]['Genero'] === "Fem" || data['data'][obj]['Genero'] != undefined){
                this.Fem += data['data'][obj]['?bitos'] + ",";
              }            
          }
      }
      */
      //console.log(this.masNorte + " Masculino");
      //console.log(this.femNorte + " Feminino");
      //console.log(this.Regiao + " Região");


      for(var i = 0;i < this.Regiao.length; i++){
        this.arrData.push([stringify(this.Regiao[i]), parseInt(this.masNorte[i]), parseInt(this.femNorte[i])]);
      }
      //console.log(this.arrData);
      google.charts.setOnLoadCallback(this.drawChart);
    })
  }
      
  drawChart = () => {
    var data = google.visualization.arrayToDataTable(this.arrData);
    var options = {
      width: 500,
      height: 500,
      title: 'Generos dos Obitos por Região',
      // backgroundColor: 'white',
      legend: { position: 'top', maxLines: 3},
      bar: { groupWidth: '75%' },
      isStacked: false,
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
    const chart = new google.visualization.ColumnChart(this.columnChart.nativeElement);
    chart.draw(data, options);
  }

  ngAfterViewInit() {   
  }

/*
  drawChart(drawChart: any) {
    throw new Error("Method not implemented.");
  }
*/
}