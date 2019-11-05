import { Component, ViewChild, ElementRef, OnInit, ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFilter } from 'app/components/qd-filtro/filtro';
import { GetParent } from '../cards/parent.directive';
import { Card } from '../cards/card';
import { RequisitonService } from '../cards/requisition.service';
import { CardsComponent } from '../cards/cards.component';
declare var google: any;

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit, IFilter, Card {
  endpoint: string = "";
  arrData: any = [];
  Mas: any = [];
  Fem: any = [];
  filtro: any = [];
  http: HttpClient;
  chart;

  // options = new CardsComponent.Options(620,520);

  options = {
    width: 620,
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
    title: `Custos de internação do sexo em ${this.filtro.faixaEtaria}`,
    legend: { position: 'top', maxLines: 3 },
    chartArea: { left: '12%', top: '25%', width: '65%', height: '75%' }
  };

  @ViewChild('pieChart') pieChart: ElementRef

  constructor(http: HttpClient, private viewContainerRef: ViewContainerRef) {
    this.http = http;
    this.endpoint = "pie";
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
      ano: '2018',
      genero: ' Masc',
      faixaEtaria: ' 15 a 19 anos',
      mes: 'Jan',
      regio: '1 Região Norte'
    }

    GetParent.addObserverToFilter(this);
  }

  drawChart = () => {
    this.arrData = [];
    this.arrData.push(['Região', 'Valor Gasto']);
    this.Mas = [];
    this.Fem = [];
    this.options.title = 'Custos de internações' + ' em ' + this.filtro.ano + ' no mês de ' + this.filtro.mes + ' do sexo ' + this.filtro.genero + ' de ' + this.filtro.faixaEtaria;

    this.chart = new google.visualization.PieChart(this.pieChart.nativeElement);

    RequisitonService.montaGrafico(this);
  }

  montaGrafico(data: any) {
    if(this.filtro.genero == 'Todos'){

      data['data'].filter(({ regio }) => {
        return regio != "Total";
      }).forEach(({ regio, valorServicoesHospitalares, genero }) => {
        this.arrData.push([regio + '/' + genero, parseInt(valorServicoesHospitalares)]);
      });
      var data1 = google.visualization.arrayToDataTable(this.arrData);
      this.chart.draw(data1, this.options);
    
    }else{

    data['data'].filter(({ regio }) => {
      return regio != "Total";
    }).forEach(({ regio, valorServicoesHospitalares }) => {
      this.arrData.push([regio, parseInt(valorServicoesHospitalares)]);
    });
    var data1 = google.visualization.arrayToDataTable(this.arrData);
    this.chart.draw(data1, this.options);
  }
  }
}