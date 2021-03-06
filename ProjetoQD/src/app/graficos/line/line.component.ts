import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, Input, ViewContainerRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { stringify } from '@angular/compiler/src/util';
import { GetParent } from '../cards/parent.directive';
import { IFilter } from 'app/components/qd-filtro/filtro';
import { Card } from '../cards/card';
import { RequisitonService } from '../cards/requisition.service';
declare var google: any;

@Component({
  selector: 'app-line',
  template: '<div #lineChart></div>',
  styleUrls: ['./line.component.scss']
})

export class LineComponent implements OnInit, IFilter, Card {
  http: HttpClient;
  endpoint: string = '';

  filtro: any = [];
  arrData: any = [];
  Mas: any = [];
  Fem: any = [];
  meses: any = [];
  chart;

  options = {
    width: 620,
    height: 520,
    title: 'Óbitos por gênero de ' + this.filtro.faixaEtaria + " no ano de " + this.filtro.ano + ' na ' + this.filtro.regio,
    curveType: 'function',
    legend: {
      position: 'bottom'
    },
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
    chartArea: { left: '12%', top: '10%', width: '80%', height: '75%' }
  };

  @ViewChild('lineChart') lineChart: ElementRef

  constructor(http: HttpClient, private viewContainerRef: ViewContainerRef) {
    this.http = http;
    this.endpoint = 'line';
  }

  atualizarFiltro(filtro: string): void {
    if (null != filtro) {
      this.filtro = filtro;
      this.drawChart();
    }
  }

  ngOnInit(): void {

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.load("visualization", "1", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(this.drawChart);

    this.filtro = {
      ano: "2018",
      faixaEtaria: " 70 a 79 anos",
      regio: "1 Região Norte",
      genero: " Masc"
    }

    GetParent.addObserverToFilter(this);
  }

  drawChart = () => {
    this.arrData = [];
    this.Mas = [];
    this.Fem = [];
    this.meses = [];

    this.options.title = 'Total de óbitos por gênero de ' + this.filtro.faixaEtaria + " no ano de " + this.filtro.ano + ' na ' + this.filtro.regio;

    this.chart = new google.visualization.LineChart(this.lineChart.nativeElement);

    RequisitonService.montaGrafico(this);
  }


  montaGrafico(data: any) {


    if(this.filtro.genero == 'Todos'){
      this.arrData.push(['Mês', 'Masculino', 'Feminino']);

      data['data'].filter(({genero})=>{
        return " Masc" === genero
      }).forEach(({mes, bitos}) => {
        this.meses.push(mes);
        this.Mas.push(bitos);
      });
  
      console.log(this.meses);

      data['data'].filter(({genero})=>{
        return " Masc" !== genero
      }).forEach(({ bitos}) => {
        this.Fem.push(bitos);
      });

      for (var i = 0; i < this.meses.length; i++) {
        this.arrData.push([stringify(this.meses[i]), parseInt(this.Mas[i]), parseInt(this.Fem[i])]);
      }

    }else if(this.filtro.genero == ' Masc'){
      this.arrData.push(['Mês', 'Masculino']);

      
      data['data'].filter(({genero})=>{
        return " Masc" === genero
      }).forEach(({mes, bitos}) => {
        this.meses.push(mes);
        this.Mas.push(bitos);
      });

      for (var i = 0; i < this.meses.length; i++) {
        this.arrData.push([stringify(this.meses[i]), parseInt(this.Mas[i])]);
      }

      console.log(this.meses);

    }else if(this.filtro.genero == ' Fem'){
      this.arrData.push(['Mês', 'Feminino']);

      
      data['data'].filter(({genero})=>{
        return " Fem" === genero
      }).forEach(({mes, bitos}) => {
        this.meses.push(mes);
        this.Fem.push(bitos);
      });

      console.log(this.meses);

      for (var i = 0; i < this.meses.length; i++) {
        this.arrData.push([stringify(this.meses[i]), parseInt(this.Fem[i])]);
      }

    }


    var data1 = google.visualization.arrayToDataTable(this.arrData);
    this.chart.draw(data1, this.options);
  }

}