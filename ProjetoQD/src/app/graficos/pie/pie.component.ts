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
  total;
  totalFem;
  totalMas;
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
      faixaEtaria: ' 70 a 79 anos',
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
    this.totalFem = null;
    this.totalMas = null;
    this.total = 0;





    // this.options.title = 'Custos de internações' + ' em ' + this.filtro.ano + ' no mês de ' + this.filtro.mes + ' do sexo ' + this.filtro.genero + ' de ' + this.filtro.faixaEtaria + ' valor total do custo no filtro selecionado ' + this.total;

    this.chart = new google.visualization.PieChart(this.pieChart.nativeElement);
    
    RequisitonService.montaGrafico(this);
  }

  montaGrafico(data: any) {

    const valoresRegioes = data['data'].filter(({ regio }) => {
      return regio != "Total";
    });

    if (this.filtro.genero == 'Todos') {

      const regiao = {
        NORTE: "1 Região Norte",
        NORDESTE: "2 Região Nordeste",
        SUDESTE: "3 Região Sudeste",
        SUL: "4 Região Sul",
        CENTRO_OESTE: "5 Região Centro-Oeste"
      }

      const genero = {
        MASC: " Masc",
        FEM: " Fem",
      }

      var objetoFemNorte = valoresRegioes.find(({ regio, genero }) => {
        return genero.FEM === genero || regiao.NORTE === regio
      });

      var objetoMascNorte = valoresRegioes.find(({ regio, genero }) => {
        return genero.MASC === genero || regiao.NORTE === regio
      });

      var objetoFemNordeste = valoresRegioes.find(({ regio, genero }) => {
        return genero.FEM === genero || regiao.NORDESTE === regio
      });

      var objetoMascNordeste = valoresRegioes.find(({ regio, genero }) => {
        return genero.MASC === genero || regiao.NORDESTE === regio
      });

      var objetoFemSudeste = valoresRegioes.find(({ regio, genero }) => {
        return genero.FEM === genero || regiao.SUDESTE === regio
      });

      var objetoMascSudeste = valoresRegioes.find(({ regio, genero }) => {
        return genero.MASC === genero || regiao.SUDESTE === regio
      });

      var objetoFemSul = valoresRegioes.find(({ regio, genero }) => {
        return genero.FEM === genero || regiao.SUL === regio
      });

      var objetoMascSul = valoresRegioes.find(({ regio, genero }) => {
        return genero.MASC === genero || regiao.SUL === regio
      });

      var objetoFemCentroOeste = valoresRegioes.find(({ regio, genero }) => {
        return genero.FEM === genero || regiao.CENTRO_OESTE === regio
      });

      var objetoMascCentroOeste = valoresRegioes.find(({ regio, genero }) => {
        return genero.MASC === genero || regiao.CENTRO_OESTE === regio
      });

      

      var valoresOrdenados = [];

      valoresOrdenados[0] = {
        regio: objetoFemNorte.regio,
        genero: "Todos",
        valorServicoesHospitalares: parseInt(objetoFemNorte.valorServicoesHospitalares) + parseInt(objetoMascNorte.valorServicoesHospitalares)
      };

      valoresOrdenados[1] = {
        regio: objetoFemNordeste.regio,
        genero: "Todos",
        valorServicoesHospitalares: parseInt(objetoFemNordeste.valorServicoesHospitalares) + parseInt(objetoMascNordeste.valorServicoesHospitalares)
      };

      valoresOrdenados[2] = {
        regio: objetoFemSudeste.regio,
        genero: "Todos",
        valorServicoesHospitalares: parseInt(objetoFemSudeste.valorServicoesHospitalares) + parseInt(objetoMascSudeste.valorServicoesHospitalares)
      };

      valoresOrdenados[3] = {
        regio: objetoFemSul.regio,
        genero: "Todos",
        valorServicoesHospitalares: parseInt(objetoFemSul.valorServicoesHospitalares) + parseInt(objetoMascSul.valorServicoesHospitalares)
      };

      valoresOrdenados[4] = {
        regio: objetoFemCentroOeste.regio,
        genero: "Todos",
        valorServicoesHospitalares:parseInt(objetoFemCentroOeste.valorServicoesHospitalares) + parseInt(objetoMascCentroOeste.valorServicoesHospitalares)
      };

      this.total = parseInt(valoresOrdenados[1].valorServicoesHospitalares) + parseInt(valoresOrdenados[2].valorServicoesHospitalares) + parseInt(valoresOrdenados[3].valorServicoesHospitalares)  + parseInt(valoresOrdenados[4].valorServicoesHospitalares); 

      valoresOrdenados.forEach(({ regio, valorServicoesHospitalares, genero }) => {
        this.arrData.push([regio + '/' + genero, parseInt(valorServicoesHospitalares)]);
      });



    } else {

      valoresRegioes.forEach(({ regio, valorServicoesHospitalares }) => {
        this.total += parseInt(valorServicoesHospitalares);
        this.arrData.push([regio, parseInt(valorServicoesHospitalares)]);
      });

    }

    this.options.title = 'Custos de internações' + ' em ' + this.filtro.ano + ' no mês de ' + this.filtro.mes + ' do sexo ' + this.filtro.genero + ' de ' + this.filtro.faixaEtaria + ' valor total do custo no filtro selecionado ' + this.total;

    var data1 = google.visualization.arrayToDataTable(this.arrData);
    this.chart.draw(data1, this.options);

  }
}