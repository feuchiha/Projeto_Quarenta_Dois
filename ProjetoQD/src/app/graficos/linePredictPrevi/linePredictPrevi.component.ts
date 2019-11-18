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
  cards: Card[] = [];

  jaPassou2018: boolean = false;

  arrData: any = [];
  Mas: any = [];
  Fem: any = [];
  meses: any = [];
  MasPredict: any = [];
  FemPredict: any = [];
  mesesPredit: any = [];

  jaPassouPorTodos: boolean[] = [false, false];

  @ViewChild('lineChart') lineChart: ElementRef

  atualizarFiltro(filtro: any): void {
    if (null !== filtro) {
      console.log(filtro);
      for (let index = 0; index < this.cards.length; index++) {
        const card = this.cards[index];
        filtro = Object.assign({}, filtro);
        if (0 == index){
          filtro.ano = "2018"
        } else {
          filtro.ano = "2019"
        }
        filtro["paraPredicao"] = true;
        card.filtro = filtro;        
      }

      this.jaPassouPorTodos[0]=false;
      this.jaPassouPorTodos[1] = false;
      this.arrData = [];

      if(this.cards[1].filtro.genero == " Masc"){
        this.arrData.push(['Mês', 'Masculino']);
      }else if(this.cards[1].filtro.genero == " Fem"){
        this.arrData.push(['Mês', 'Feminino']);
      }else if(this.cards[1].filtro.genero == "Todos"){
        this.arrData.push(['Mês', 'Masculino', 'Feminino']);
      }

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
        paraPredicao:true,
        mes:"Jan",
        genero: " Masc",
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
        genero: " Masc",
        mes:"Jan",
        paraPredicao:true
      },
      endpoint: 'linePredict',
      montaGrafico: this.montaGrafico
    }

  }

  ngOnInit(): void {

    if(this.cards[1].filtro.genero == " Masc"){
      this.arrData.push(['Mês', 'Masculino']);
    }else if(this.cards[1].filtro.genero == " Fem"){
      this.arrData.push(['Mês', 'Feminino']);
    }else if(this.cards[1].filtro.genero == "Todos"){
      this.arrData.push(['Mês', 'Masculino', 'Feminino']);
    }

    GetParent.addObserverToFilter(this);
    RequisitonService.montaGraficoPrevi(this);

  }

  montaGrafico(card: Card, data: any) {
    this.meses = [];
    this.Mas = [];
    this.Fem = [];

    for (let obj in data['data']) {

      if(card.filtro.genero == " Masc"){

      if (data['data'][obj]['genero'] == " Masc") {
        this.meses.push(data['data'][obj]['mes']);
      }
      if (data['data'][obj]['genero'] === " Masc") {
        this.Mas.push(data['data'][obj]['bitos']);
      } 

    }else if(card.filtro.genero == " Fem"){

      if (data['data'][obj]['genero'] == " Fem") {
        this.meses.push(data['data'][obj]['mes']);
      }
      if (data['data'][obj]['genero'] === " Fem") {
        this.Fem.push(data['data'][obj]['bitos']);
      } 

    }else if(card.filtro.genero == "Todos"){

      if (data['data'][obj]['genero'] == " Masc") {
        this.meses.push(data['data'][obj]['mes']);
      }
      if (data['data'][obj]['genero'] === " Masc") {
        this.Mas.push(data['data'][obj]['bitos']);
      }else{
        this.Fem.push(data['data'][obj]['bitos']);
      }
    }
    
    }

     if(card.filtro.genero == "Todos"){
      for (var i = 0; i < this.meses.length; i++) {
        this.arrData.push([stringify(this.meses[i] +"/"+ card.filtro.ano.slice(-2)), parseInt(this.Mas[i]), parseInt(this.Fem[i])]);
      }
    }else if(card.filtro.genero == " Masc"){
      for (var i = 0; i < this.meses.length; i++) {
        this.arrData.push([stringify(this.meses[i] +"/"+ card.filtro.ano.slice(-2)), parseInt(this.Mas[i])]);
      }
    }else if(card.filtro.genero == " Fem"){
      for (var i = 0; i < this.meses.length; i++) {
        this.arrData.push([stringify(this.meses[i] +"/"+ card.filtro.ano.slice(-2)), parseInt(this.Fem[i])]);
      }
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

  ordenarPorAno() {
    this.sort()
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

  sort() {
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
    const options = {
      width: 1200,
      height: 520,
      title: 'Previsão de obitos por '+this.cards[0].filtro.regio +' de '+this.cards[0].filtro.faixaEtaria +' do gênero ' + this.cards[0].filtro.genero + ' no período de '+ this.cards[0].filtro.mes +' a Dez 2018 os dados reais e  Jan a Jun de 2019 a previsão',
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

    this.jaPassou2018 = false;

    const chart = new google.visualization.LineChart(this.lineChart.nativeElement);
    chart.draw(data, options);
  }

}