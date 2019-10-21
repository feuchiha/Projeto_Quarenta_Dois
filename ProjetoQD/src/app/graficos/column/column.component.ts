import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, Input, ViewContainerRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { stringify } from '@angular/compiler/src/util';
import { IFilter } from 'app/components/qd-filtro/filtro';
import { Card } from '../cards/card';
import { RequisitonService } from '../cards/requisition.service';
import { GetParent } from '../cards/parent.directive';
declare var google: any;

@Component({
  selector: 'app-column',
  template: '<div #columnChart></div>',
  styleUrls: ['./column.component.scss']
})


export class ColumnComponent implements OnInit, IFilter, Card {
  http: HttpClient;
  filtro: any = [];
  endpoint: string = "column";

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
    title: 'Obitos em '+this.filtro.ano +' do sexo '+ this.filtro.genero+' de '+this.filtro.faixaEtaria+' todas as regiões',
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


  atualizarFiltro(filtro: string): void {
    if (null != filtro) {
      this.filtro = filtro;
      this.drawChart();
    }
  }

  constructor(http: HttpClient, public toastr: ToastrManager, private viewContainerRef: ViewContainerRef) {
    this.http = http;
  
  }

  ngOnInit(): void {

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.load("visualization", "1", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(this.drawChart);

    this.filtro = {
      faixaEtaria: " 70 a 79 anos",
      ano: "2008",
      genero:" Masc"
    }

    GetParent.addObserverToFilter(this);
  }
      
  drawChart = () => {

    this.arrData = [];
    this.Norte = [];
    this.Nordeste = [];
    this.Sudeste = [];
    this.Sul = [];
    this.Centro = [];
    this.mes = [];

    this.options.title = 'Obitos em '+this.filtro.ano +' do sexo '+ this.filtro.genero+' de '+this.filtro.faixaEtaria;

    this.chart = new google.visualization.ColumnChart(this.columnChart.nativeElement);
    RequisitonService.montaGrafico(this);
  }

  montaGrafico(data: any) {
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
  }
}