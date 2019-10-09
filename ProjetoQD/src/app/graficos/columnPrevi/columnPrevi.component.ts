import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { stringify } from '@angular/compiler/src/util';
declare var google: any;

@Component({
  selector: 'app-columnPrevi',
  template: '<div #columnChart></div>',
  styleUrls: ['./columnPrevi.component.scss']
})


export class ColumnPreviComponent implements OnInit {
  filtros = {faixaEtaria:"", ano:"", genero:""};
  arrData:any = [];
  Norte: any = [];
  Nordeste: any = [];
  Sudeste: any = [];
  Sul: any = [];
  Centro: any = [];
  mes: any = [];
  previNorte: any = [];
  previNordeste: any = [];
  previSudeste: any = [];
  previSul: any = [];
  previCentro: any = [];
  previmes: any = [];

  @ViewChild('columnChart') columnChart: ElementRef


  constructor(private http: HttpClient, public toastr: ToastrManager) {
  }

  ngOnInit(): void {

    this.filtros = {
      faixaEtaria: " 70 a 79 anos",
      ano: "2018",
      genero:" Masc"
    }

    google.charts.load('current', { 'packages': ['corechart'] });
    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json')
    this.http.post(`http://localhost:3002/index/column`,
      JSON.stringify(this.filtros),{
      headers: headers
    })
    .subscribe(data => {
      //console.log(data);
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
        this.arrData.push([this.mes[i]+'/18', parseInt(this.Norte[i]), parseInt(this.Nordeste[i]), parseInt(this.Sudeste[i]), parseInt(this.Sul[i]), parseInt(this.Centro[i]),]);
      }
      this.previColumn();
    })
  }


 previColumn(): void {

    this.filtros = {
      faixaEtaria: " 70 a 79 anos",
      ano: "2019",
      genero:" Masc"
    }

    google.charts.load('current', { 'packages': ['corechart'] });
    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json')
    this.http.post(`http://localhost:3002/index/columnPredict`,
      JSON.stringify(this.filtros),{
      headers: headers
    })
    .subscribe(data => {
      //console.log(data);
      for(let obj in data['data']){
        if(data['data'][obj]['regio'] === "1 Região Norte"){
          this.previmes.push(data['data'][obj]['mes']);
        }
        if(data['data'][obj]['regio'] === "1 Região Norte"){
            this.previNorte.push(data['data'][obj]['bitos']);
        }else if(data['data'][obj]['regio'] === "2 Região Nordeste"){
            this.previNordeste.push(data['data'][obj]['bitos']);
        }else if(data['data'][obj]['regio'] === "3 Região Sudeste"){
            this.previSudeste.push(data['data'][obj]['bitos']);
        }else if(data['data'][obj]['regio'] === "4 Região Sul"){
          this.previSul.push(data['data'][obj]['bitos']);
        }else if(data['data'][obj]['regio'] === "5 Região Centro-Oeste"){
          this.previCentro.push(data['data'][obj]['bitos']);
      }
    }
      for(var i = 0;i < this.previmes.length; i++){
        this.arrData.push([this.previmes[i]+'/19', parseInt(this.previNorte[i]), parseInt(this.previNordeste[i]), parseInt(this.previSudeste[i]), parseInt(this.previSul[i]), parseInt(this.previCentro[i]),]);
      }
      //console.log(this.arrData);
      google.charts.setOnLoadCallback(this.drawChart);
    })
  }
      
  drawChart = () => {
    var data = google.visualization.arrayToDataTable(this.arrData);
    var options = {
      width: 1220,
      height: 520,
      title: 'Previsão de obitos em '+this.filtros.ano +' do sexo '+ this.filtros.genero+' de '+this.filtros.faixaEtaria+' todas as regiões',
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