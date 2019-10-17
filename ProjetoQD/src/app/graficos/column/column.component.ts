import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, Input } from '@angular/core';
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
  // filtros = {faixaEtaria:"", ano:"", genero:""};
  filtros:any = [];
  arrData:any = [];
  Norte: any = [];
  Nordeste: any = [];
  Sudeste: any = [];
  Sul: any = [];
  Centro: any = [];
  mes: any = [];
  chart;

  options = {
    width: 620,
    height: 520,
    title: 'Obitos em '+this.filtros.ano +' do sexo '+ this.filtros.genero+' de '+this.filtros.faixaEtaria+' todas as regiões',
    // backgroundColor: 'white',
    legend: { position: 'top', maxLines: 3},
    bar: { groupWidth: '75%' },
    isStacked: true,
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

  @ViewChild('columnChart') columnChart: ElementRef


  @Input() set name(name: string) {
    console.log("set")
    if (null != name) {
      this.filtros = name;
      this.drawChart();
    }
  }

  constructor(private http: HttpClient, public toastr: ToastrManager) {
  }

  ngOnInit(): void {

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.load("visualization", "1", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(this.drawChart);

    this.filtros = {
      faixaEtaria: " 70 a 79 anos",
      ano: "2008",
      genero:" Masc"
    }
  }
      
  drawChart = () => {

    this.arrData = [];
    this.Norte = [];
    this.Nordeste = [];
    this.Sudeste = [];
    this.Sul = [];
    this.Centro = [];
    this.mes = [];

    this.options.title = 'Obitos em '+this.filtros.ano +' do sexo '+ this.filtros.genero+' de '+this.filtros.faixaEtaria;

    this.chart = new google.visualization.ColumnChart(this.columnChart.nativeElement);

    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json')
    this.http.post(`http://localhost:3002/index/column`,
      JSON.stringify(this.filtros),{
      headers: headers
    })
    .subscribe(data => {
    this.arrData.push(['Mês', 'Norte' , 'Nordeste', 'Sudeste', 'Sul', 'Centro-Oeste']);
      for(let obj in data['data']){
        if(data['data'][obj]['regio'] === "1 Região Norte"){
          this.mes.push(data['data'][obj]['mes']);
        }
        if(data['data'][obj]['regio'] === "1 Região Norte"){
            this.Norte.push(data['data'][obj]['bitos']);
        }else if(data['data'][obj]['regio'] === "2 Região Nordeste"){
            this.Nordeste.push(data['data'][obj]['bitos']);
        }else if(data['data'][obj]['regio'] === "3 Região Sudeste"){
            this.Sudeste.push(data['data'][obj]['bitos']);
        }else if(data['data'][obj]['regio'] === "4 Região Sul"){
          this.Sul.push(data['data'][obj]['bitos']);
        }else if(data['data'][obj]['regio'] === "5 Região Centro-Oeste"){
          this.Centro.push(data['data'][obj]['bitos']);
      }
    }
      for(var i = 0;i < this.mes.length; i++){
        this.arrData.push([this.mes[i], parseInt(this.Norte[i]), parseInt(this.Nordeste[i]), parseInt(this.Sudeste[i]), parseInt(this.Sul[i]), parseInt(this.Centro[i]),]);
      }

      var data1 = google.visualization.arrayToDataTable(this.arrData);
    
      this.chart.draw(data1, this.options);  
    })



  }
}