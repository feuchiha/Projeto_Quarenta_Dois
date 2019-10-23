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
  selector: 'app-line-predict',
  template: '<div #lineChart></div>',
  styleUrls: ['./linePredict.component.scss']
})

export class LinePredictComponent implements OnInit, IFilter, Card {
  http: HttpClient;

  filtro: any;
  endpoint: string = 'linePredict';

  // filtros = { ano: "", faixaEtaria: "", regio: "" };
  filtros: any = [];
  arrData: any = [];
  Mas: any = [];
  Fem: any = [];
  meses: any = [];
  chart;

  options = {
    width: 620,
    height: 520,
    title: 'Previsão de obitos por genero de ' + this.filtros.faixaEtaria + " no ano de " + this.filtros.ano + ' na ' + this.filtros.regio,
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

  constructor(http: HttpClient, public toastr: ToastrManager, private viewContainerRef: ViewContainerRef) {
  this.http =http;
  
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
      ano: "2019",
      faixaEtaria: " 30 a 39 anos",
      regio: "1 Região Norte",
    }
    GetParent.addObserverToFilter(this);
  }

  drawChart = () => {
    this.arrData = [];
    this.Mas = [];
    this.Fem = [];
    this.meses = [];

    this.options.title = 'Previsão de obitos por genero de ' + this.filtro.faixaEtaria + ' no ano de 2019 na ' + this.filtro.regio;

    this.chart = new google.visualization.LineChart(this.lineChart.nativeElement);
    RequisitonService.montaGrafico(this);
    // const headers = new HttpHeaders()
    //   .set('Authorization', 'my-auth-token')
    //   .set('Content-Type', 'application/json')
    // this.http.post(`http://localhost:3002/index/linePredict`,
    //   JSON.stringify(this.filtros), {
    //   headers: headers
    // })
    //   .subscribe(data => {

    //   })
  }


  montaGrafico(data: any) {
    this.arrData.push(['Mês', 'Masculino', 'Feminino']);

    data['data'].filter(({genero})=>{
      return " Masc" === genero
    }).forEach(({mes, bitos}) => {
      this.meses.push(mes);
      this.Mas.push(bitos);
    });

    data['data'].filter(({genero})=>{
      return " Masc" !== genero
    }).forEach(({ bitos}) => {
      this.Fem.push(bitos);
    });

    for (var i = 0; i < this.meses.length; i++) {
      this.arrData.push([stringify(this.meses[i]), parseInt(this.Mas[i]), parseInt(this.Fem[i])]);
    }
    var data1 = google.visualization.arrayToDataTable(this.arrData);
    this.chart.draw(data1, this.options);
  }
}