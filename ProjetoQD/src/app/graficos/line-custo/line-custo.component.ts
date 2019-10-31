import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, Input, ViewContainerRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { stringify } from '@angular/compiler/src/util';
import { IFilter } from 'app/components/qd-filtro/filtro';
import { Card, GraficoPrevisao } from '../cards/card';
import { GetParent } from '../cards/parent.directive';
import { RequisitonService } from '../cards/requisition.service';
declare var google: any;

@Component({
  selector: 'app-line-custo',
  template: '<div #lineChart></div>',
  styleUrls: ['./line-custo.component.css']
})
export class LineCustoComponent implements OnInit, IFilter, GraficoPrevisao {
  cards: Card[] = [];

  atualizarFiltro(filtro: string): void {
    this.cards[0].filtro = filtro;
    this.cards[0].filtro.ano = "2018";

    this.cards[1].filtro = filtro;
    this.cards[1].filtro.ano = "2019";
    this.arrData = [];
    this.arrData.push(['Mês', 'Masculino', 'Feminino']);

    RequisitonService.montaGraficoPrevi(this);
  }


  arrData: any = [];
  Mas: any = [];
  Fem: any = [];
  meses: any = [];
  MasPredict: any = [];
  FemPredict: any = [];
  mesesPredit: any = [];

  @ViewChild('lineChart') lineChart: ElementRef

  constructor(private http: HttpClient, public toastr: ToastrManager, private viewContainerRef: ViewContainerRef) {

    this.cards[0] = <Card>{
      http: this.http,
      filtro: {
        ano: "2018",
        faixaEtaria: " 70 a 79 anos",
        regio: "3 Região Sudeste",
      },
      endpoint: 'line',
      montaGrafico: this.montaGrafico
    }

    this.cards[1] = <Card>{
      http: this.http,
      filtro: {
        ano: "2019",
        faixaEtaria: " 70 a 79 anos",
        regio: "3 Região Sudeste",
      },
      endpoint: 'linePredict',
      montaGrafico: this.montaGrafico
    }
  }

  ngOnInit(): void {

    this.arrData.push(['Mês', 'Masculino', 'Feminino']);
    GetParent.addObserverToFilter(this);
    RequisitonService.montaGraficoPrevi(this);

  }

  montaGrafico(card: Card, data: any) {
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

    for (var i = 0; i < this.meses.length; i++) {
      this.arrData.push([stringify(this.meses[i] + card.filtro.ano.slice(-2)), parseInt(this.Mas[i]), parseInt(this.Fem[i])]);
    }

    this.drawChart()

  }

  drawChart = () => {
    var data = google.visualization.arrayToDataTable(this.arrData);
    const options = {
      width: 1200,
      height: 520,
      // title: 'Previsão dos custos de internações por genero de ' + this.filtro.faixaEtaria + ' em ' + this.filtro.ano + ' na ' + this.filtro.regio,
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
