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

  atualizarFiltro(filtro: any): void {
    if (null != filtro) {
      for (let index = 0; index < this.cards.length; index++) {
        const card = this.cards[index];
        filtro = Object.assign({}, filtro);
        if (0 == index) {
          filtro.ano = "2018"
          filtro.genero = "Todos"
          filtro.regio = "Total";
        } else {
          filtro.genero = "Todos"
          filtro.ano = "2019"
          filtro.regio = "Total";
        }

        filtro["paraPredicao"] = true;
        card.filtro = filtro;
      }

      this.jaPassouPorTodos[0] = false;
      this.jaPassouPorTodos[1] = false;

      this.arrData = [];

      this.arrData.push(['Mês', 'Masculino', 'Feminino']);
      RequisitonService.montaGraficoPrevi(this);
    }
  }

  jaPassouPorTodos: boolean[] = [false, false];

  arrData: any = [];
  Norte: any = [];
  Nordeste: any = [];
  Sudeste: any = [];
  Sul: any = [];
  Centro: any = [];
  NorteMasc: any = [];
  NordesteMasc: any = [];
  SudesteMasc: any = [];
  SulMasc: any = [];
  CentroMasc: any = [];
  mes: any = [];
  previNorte: any = [];
  previNordeste: any = [];
  previSudeste: any = [];
  previSul: any = [];
  previCentro: any = [];
  previmes: any = [];
  previNorteMasc: any = [];
  previNordesteMasc: any = [];
  previSudesteMasc: any = [];
  previSulMasc: any = [];
  previCentroMasc: any = [];


  @ViewChild('columnChart') columnChart: ElementRef


  constructor(private http: HttpClient, public toastr: ToastrManager, private viewContainerRef: ViewContainerRef) {

    this.cards[0] = <Card>{
      http: this.http,
      filtro: {
        faixaEtaria: " 70 a 79 anos",
        ano: "2018",
        genero: "Todos",
        mes: "Jan",
        regio: "Total",
        paraPredicao: true
      },
      endpoint: 'column',
      montaGrafico: this.montaGrafico
    }

    this.cards[1] = <Card>{
      http: this.http,
      filtro: {
        faixaEtaria: " 70 a 79 anos",
        ano: "2019",
        genero: "Todos",
        mes: "Jan",
        regio: "Total",
        paraPredicao: true
      },
      endpoint: 'columnPredict',
      montaGrafico: this.montaGrafico
    }
  }

  ngOnInit(): void {

    this.arrData.push(['Mês', 'Masculino', 'Feminino']);
    GetParent.addObserverToFilter(this);
    RequisitonService.montaGraficoPrevi(this);
  }

  montaGrafico(card: Card, {data: dados}) {
    this.mes = [];
    this.Nordeste = [];
    this.Norte = [];
    this.Sudeste = [];
    this.Sul = [];
    this.Centro = [];
    this.NordesteMasc = [];
    this.NorteMasc = [];
    this.SudesteMasc = [];
    this.SulMasc = [];
    this.CentroMasc = [];

    console.log(dados);
    
    dados.filter(data => {
      return data['regio'] === "Total" && data['genero'].includes("Masc");
    }).forEach(({ bitos: obitos }) => {
      this.Norte.push(parseInt(obitos));
    });

    dados.filter(data => {
      return data['regio'] === "Total" && data['genero'].includes("Fem");
    }).forEach(({ bitos: obitos, mes }) => {
      this.mes.push(mes);
      this.NorteMasc.push(parseInt(obitos));
    });

    for (var i = 0; i < this.mes.length; i++) {
      this.arrData.push([this.mes[i] + "/" + card.filtro.ano.slice(-2), this.Norte[i], this.NorteMasc[i]]);
    }

    if ("2018" == card.filtro.ano) {
      this.jaPassouPorTodos[0] = true;
    } else {
      this.jaPassouPorTodos[1] = true;
    }

    if (this.jaPassouPorTodosMetodo()) {
      this.ordenarPorAno();
      this.drawChart();
    }
  }


  grafico = {
    "Jan/18": 1,
    "Fev/18": 2,
    "Mar/18": 3,
    "Abr/18": 4,
    "Mai/18": 5,
    "Jun/18": 6,
    "Jul/18": 7,
    "Ago/18": 8,
    "Set/18": 9,
    "Out/18": 10,
    "Nov/18": 11,
    "Dez/18": 12,
    "Jan/19": 13,
    "Fev/19": 14,
    "Mar/19": 15,
    "Abr/19": 16,
    "Mai/19": 17,
    "Jun/19": 18,
    "Jul/19": 19,
    "Ago/19": 20,
    "Set/19": 21,
    "Out/19": 22,
    "Nov/19": 23,
    "Dez/19": 24,

    sort: (inputArr) => {

      let len = inputArr.length;
      let swapped;
      do {
        swapped = false;
        for (let i = 0; i < (len - 1); i++) {
          if (this.grafico[inputArr[i][0]] > this.grafico[inputArr[i + 1][0]]) {
            let tmp = inputArr[i];
            inputArr[i] = inputArr[i + 1];
            inputArr[i + 1] = tmp;
            swapped = true;
          }
        }
      }
      while (swapped);
      return inputArr;
    }

  }

  ordenarPorAno() {
    const cabecalho = this.arrData[0];
    delete this.arrData[0];

    this.arrData = this.arrData.filter(function (el) {
      return el != null;
    });

    this.arrData = this.grafico.sort(this.arrData);


    this.arrData.unshift(cabecalho);
    this.arrData = this.arrData.filter(function (el) {
      return el != null;
    });
  }

  checker = arr => arr.every(v => v === true);


  jaPassouPorTodosMetodo(): boolean {
    return this.checker(this.jaPassouPorTodos);
  }

  drawChart = () => {
    var data = google.visualization.arrayToDataTable(this.arrData);
    var options = {
      width: 1220,
      height: 520,
      title: 'Previsão de obitos em ' + this.cards[0].filtro.ano + ' do sexo ' + this.cards[0].filtro.genero + ' de ' + this.cards[0].filtro.faixaEtaria + ' todas as regiões de ' + this.cards[0].filtro.mes + ' a Dez 2018 os dados reais e  Jan a Jun de 2019 a previsão',
      backgroundColor: 'white',
      legend: { position: 'top', maxLines: 3 },
      bar: { groupWidth: '75%' },
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