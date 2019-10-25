import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, ViewContainerRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { stringify } from '@angular/compiler/src/util';
import { IFilter } from 'app/components/qd-filtro/filtro';
import { Card } from '../cards/card';
import { RequisitonService } from '../cards/requisition.service';
import { GetParent } from '../cards/parent.directive';
declare var google: any;

@Component({
  selector: 'app-line-predictPrevi',
  template: '<div #lineChart></div>',
  styleUrls: ['./linePredictPrevi.component.scss']
})

export class LinePredictPreviComponent implements OnInit, IFilter, Card {

  http: HttpClient;
  filtro: any;
  endpoint: string[] = [];

  arrData: any = [];
  Mas: any = [];
  Fem: any = [];
  meses: any = [];
  MasPredict: any = [];
  FemPredict: any = [];
  mesesPredit: any = [];

  @ViewChild('lineChart') lineChart: ElementRef

  atualizarFiltro(filtro: string): void {
    if (null !== filtro) {
      this.filtro = filtro;
      this.filtro.ano = "2018";
      
      this.arrData = [];
      this.arrData.push(['Mês', 'Masculino', 'Feminino']);

      RequisitonService.montaGrafico(this);
    }
  }

  constructor(http: HttpClient, public toastr: ToastrManager, private viewContainerRef: ViewContainerRef) {
    this.http = http;
    this.endpoint[0] = "line";
    this.endpoint[1] = "linePredict";

  }

  ngOnInit(): void {

    this.filtro = {
      ano: "2018",
      faixaEtaria: " 70 a 79 anos",
      regio: "3 Região Sudeste",
    }


    this.arrData.push(['Mês', 'Masculino', 'Feminino']);
    GetParent.addObserverToFilter(this);
    RequisitonService.montaGrafico(this);

  }

  montaGrafico(data: any) {

    this.meses = [];
    this.Mas = [];
    this.Fem = [];

    for (let obj in data['data']) {
      if (data['data'][obj]['genero'] == " Masc") {
        this.meses.push(data['data'][obj]['mes']);
      }
      if (data['data'][obj]['genero'] === " Masc") {
        this.Mas.push(data['data'][obj]['bitos']);
      } else {
        this.Fem.push(data['data'][obj]['bitos']);
      }
    }

    if ("2018" == this.filtro.ano) {
      for (var i = 0; i < this.meses.length; i++) {
        this.arrData.push([stringify(this.meses[i] + '/18'), parseInt(this.Mas[i]), parseInt(this.Fem[i])]);
      }
      this.filtro.ano = "2019"
    } else {
      this.predictBusca();
    }
  }


  predictBusca(): void {


    for (var i = 0; i < this.meses.length; i++) {
      this.arrData.push([stringify(this.meses[i] + '/19'), parseInt(this.Mas[i]), parseInt(this.Fem[i])]);
    }

    this.drawChart();
  }

  drawChart = () => {
    var data = google.visualization.arrayToDataTable(this.arrData);
    const options = {
      width: 1200,
      height: 520,
      title: 'Previsão de obitos por genero de ' + this.filtro.faixaEtaria + " no ano de " + this.filtro.ano + ' na ' + this.filtro.regio,
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
      chartArea: { left: '7%', top: '15%', width: '90%', height: '70%' }
    };
    const chart = new google.visualization.LineChart(this.lineChart.nativeElement);
    chart.draw(data, options);
  }

}