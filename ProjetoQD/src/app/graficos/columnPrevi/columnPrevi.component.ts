import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, ViewContainerRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { stringify } from '@angular/compiler/src/util';
import { IFilter } from 'app/components/qd-filtro/filtro';
import { Card, GraficoPrevisao } from '../cards/card';
import { RequisitonService } from '../cards/requisition.service';
import { GetParent } from '../cards/parent.directive';
import { GraficosComponent } from '../graficos.component';
declare var google: any;

@Component({
  selector: 'app-columnPrevi',
  template: '<div #columnChart></div>',
  styleUrls: ['./columnPrevi.component.scss']
})


export class ColumnPreviComponent implements OnInit, IFilter, GraficoPrevisao {
  cards: Card[] = [];

  atualizarFiltro(filtro: string): void {
    if (null !== filtro) {
      this.cards[0].filtro = filtro;
      this.cards[0].filtro.ano = "2018";

      this.cards[1].filtro = filtro;
      this.cards[1].filtro.ano = "2019";

      this.arrData = [];
      this.arrData.push(['Mês', 'Norte', 'Nordeste', 'Sudeste', 'Sul', 'Centro-Oeste']);
      RequisitonService.montaGraficoPrevi(this);

    }
  }




  arrData: any = [];
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


  constructor(private http: HttpClient, public toastr: ToastrManager, private viewContainerRef: ViewContainerRef) {

    this.cards[0] = <Card>{
      http: this.http,
      filtro: {
        faixaEtaria: " 70 a 79 anos",
        ano: "2018",
        genero: " Masc"
      },
      endpoint: 'column',
      montaGrafico: this.montaGrafico
    }

    this.cards[1] = <Card>{
      http: this.http,
      filtro: {
        faixaEtaria: " 70 a 79 anos",
        ano: "2019",
        genero: " Masc"
      },
      endpoint: 'columnPredict',
      montaGrafico: this.montaGrafico
    }
  }

  ngOnInit(): void {

    this.arrData.push(['Mês', 'Norte', 'Nordeste', 'Sudeste', 'Sul', 'Centro-Oeste']);
    GetParent.addObserverToFilter(this);

    RequisitonService.montaGraficoPrevi(this);
  }

  montaGrafico(card: Card, data: any) {
    this.mes = [];
    this.Nordeste = [];
    this.Norte = [];
    this.Sudeste = [];
    this.Sul = [];
    this.Centro = [];

    for (let obj in data['data']) {
      if (data['data'][obj]['regio'] === "1 Região Norte") {
        this.mes.push(data['data'][obj]['mes']);
      }
      if (data['data'][obj]['regio'] === "1 Região Norte") {
        this.Norte.push(data['data'][obj]['bitos']);
      } else if (data['data'][obj]['regio'] === "2 Região Nordeste") {
        this.Nordeste.push(data['data'][obj]['bitos']);
      } else if (data['data'][obj]['regio'] === "3 Região Sudeste") {
        this.Sudeste.push(data['data'][obj]['bitos']);
      } else if (data['data'][obj]['regio'] === "4 Região Sul") {
        this.Sul.push(data['data'][obj]['bitos']);
      } else if (data['data'][obj]['regio'] === "5 Região Centro-Oeste") {
        this.Centro.push(data['data'][obj]['bitos']);
      }
    }

    for (var i = 0; i < this.mes.length; i++) {
      this.arrData.push([this.mes[i] + card.filtro.ano.slice(-2), parseInt(this.Norte[i]), parseInt(this.Nordeste[i]), parseInt(this.Sudeste[i]), parseInt(this.Sul[i]), parseInt(this.Centro[i]),]);
    }

    this.drawChart();
    // if ("2018" == card.filtro.ano) {
    //   for (var i = 0; i < this.mes.length; i++) {
    //     this.arrData.push([this.mes[i] + '/18', parseInt(this.Norte[i]), parseInt(this.Nordeste[i]), parseInt(this.Sudeste[i]), parseInt(this.Sul[i]), parseInt(this.Centro[i]),]);
    //   }
    //   // this.cards[0].filtro.ano = "2019"
    //   // this.endpoint[0] = "columnPredict";
    //   // RequisitonService.montaGraficoPrevi(this);
    // } else {
    //   this.previColumn();
    // }
  }

  // previColumn(): void {

  //   for (var i = 0; i < this.mes.length; i++) {
  //     this.arrData.push([this.mes[i] + '/19', parseInt(this.Norte[i]), parseInt(this.Nordeste[i]), parseInt(this.Sudeste[i]), parseInt(this.Sul[i]), parseInt(this.Centro[i]),]);
  //   }

  //   this.drawChart();
  // }

  drawChart = () => {
    var data = google.visualization.arrayToDataTable(this.arrData);
    var options = {
      width: 1220,
      height: 520,
      // title: 'Previsão de obitos em ' + this.cards[0].filtro.ano + ' do sexo ' + this.cardUtilizado.filtro.genero + ' de ' + this.cardUtilizado.filtro.faixaEtaria + ' todas as regiões',
      // backgroundColor: 'white',
      legend: { position: 'top', maxLines: 3 },
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
      chartArea: { left: '7%', top: '18%', width: '90%', height: '70%' }
    };
    const chart = new google.visualization.ColumnChart(this.columnChart.nativeElement);

    chart.draw(data, options);
  }

  ngAfterViewInit() {
  }

}