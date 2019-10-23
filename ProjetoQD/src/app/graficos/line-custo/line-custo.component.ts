import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { stringify } from '@angular/compiler/src/util';
import { IFilter } from 'app/components/qd-filtro/filtro';
import { Card } from '../cards/card';
declare var google: any;

@Component({
  selector: 'app-line-custo',
  template: '<div #lineChart></div>',
  styleUrls: ['./line-custo.component.css']
})
export class LineCustoComponent implements OnInit, IFilter, Card {
  http: HttpClient;
  atualizarFiltro(filtro: string): void {
    throw new Error("Method not implemented.");
  }
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

  constructor(http: HttpClient, public toastr: ToastrManager) {
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
        this.Mas.push(data['data'][obj]['valorServicoesHospitalares']);
      } else {
        this.Fem.push(data['data'][obj]['valorServicoesHospitalares']);
      }
    }

    if ("2018" == this.filtro.ano) {
      for (var i = 0; i < this.meses.length; i++) {
        this.arrData.push([stringify(this.meses[i] + '/18'), parseInt(this.Mas[i]), parseInt(this.Fem[i])]);
      }


      this.filtro = {
        ano: "2019",
        faixaEtaria: " 70 a 79 anos",
        regio: "3 Região Sudeste",
      }
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
      title: 'Previsão dos custos de internações por genero de ' + this.filtro.faixaEtaria + ' em ' + this.filtro.ano + ' na ' + this.filtro.regio,
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
