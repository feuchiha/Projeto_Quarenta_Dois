import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, ViewContainerRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { stringify } from '@angular/compiler/src/util';
import { IFilter } from 'app/components/qd-filtro/filtro';
import { Card, GraficoPrevisao } from '../cards/card';
import { RequisitonService } from '../cards/requisition.service';
import { GetParent } from '../cards/parent.directive';
declare var google: any;

@Component({
  selector: 'app-line-predictPrevi',
  template: '<div #lineChart></div>',
  styleUrls: ['./linePredictPrevi.component.scss']
})

export class LinePredictPreviComponent implements OnInit, IFilter, GraficoPrevisao {
  cards: Card[] =[];

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
      this.cards[0].filtro = filtro;
      this.cards[0].filtro.ano = "2018";

      this.cards[1].filtro = filtro;
      this.cards[1].filtro.ano = "2019";

      this.arrData = [];
      this.arrData.push(['Mês', 'Masculino', 'Feminino']);

      RequisitonService.montaGraficoPrevi(this);
    }
  }

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
        this.Mas.push(data['data'][obj]['bitos']);
      } else {
        this.Fem.push(data['data'][obj]['bitos']);
      }
    }

    for (var i = 0; i < this.meses.length; i++) {
      this.arrData.push([stringify(this.meses[i] + "/" + card.filtro.ano.slice(-2)), parseInt(this.Mas[i]), parseInt(this.Fem[i])]);
    }
    if("2019"==card.filtro.ano){
      this.drawChart();
    }
  }

  drawChart = () => {
    console.log(this.arrData);
    
    var data = google.visualization.arrayToDataTable(this.arrData);
    const options = {
      width: 1200,
      height: 520,
      title: 'Custo por internação na região norte de 15 a 19 anos com todos os gêneros no período de Jan a Dez 2018 os dados reais e  Jan a Jun de 2019 a previsão',
      // title: 'Previsão de obitos por genero de ' + this.filtro.faixaEtaria + " no ano de " + this.filtro.ano + ' na ' + this.filtro.regio,
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