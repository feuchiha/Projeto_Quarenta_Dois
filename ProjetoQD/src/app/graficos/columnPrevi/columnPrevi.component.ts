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
  selector: 'app-columnPrevi',
  template: '<div #columnChart></div>',
  styleUrls: ['./columnPrevi.component.scss']
})


export class ColumnPreviComponent implements OnInit, IFilter, Card {
  http: HttpClient;
  filtro: any;
  endpoint: string[] = [];


  atualizarFiltro(filtro: string): void {
    if (null !== filtro) {
      this.filtro = filtro;
      this.drawChart();
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


  constructor(http: HttpClient, public toastr: ToastrManager, private viewContainerRef: ViewContainerRef) {
    this.http = http;
    this.endpoint[0] = "column";
    this.endpoint[1] = "columnPredict";
  }

  ngOnInit(): void {

    this.filtro = {
      faixaEtaria: " 70 a 79 anos",
      ano: "2018",
      genero: " Masc"
    }

    this.arrData.push(['Mês', 'Norte', 'Nordeste', 'Sudeste', 'Sul', 'Centro-Oeste']);
    
    GetParent.addObserverToFilter(this);
    
    this.realColumn();
  }

  realColumn(){
    RequisitonService.montaGrafico(this);
  }

  montaGrafico(data: any) {
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

    if("2018" == this.filtro.ano){
      for(var i = 0;i < this.mes.length; i++){
        this.arrData.push([this.mes[i]+'/18', parseInt(this.Norte[i]), parseInt(this.Nordeste[i]), parseInt(this.Sudeste[i]), parseInt(this.Sul[i]), parseInt(this.Centro[i]),]);
      }

      this.filtro = {
        faixaEtaria: " 70 a 79 anos",
        ano: "2019",
        genero: " Masc"
      }
    } else {
      this.previColumn();
    }
  }



  previColumn(): void {


        // for (let obj in data['data']) {
        //   if (data['data'][obj]['regio'] === "1 Região Norte") {
        //     this.previmes.push(data['data'][obj]['mes']);
        //   }
        //   if (data['data'][obj]['regio'] === "1 Região Norte") {
        //     this.previNorte.push(data['data'][obj]['bitos']);
        //   } else if (data['data'][obj]['regio'] === "2 Região Nordeste") {
        //     this.previNordeste.push(data['data'][obj]['bitos']);
        //   } else if (data['data'][obj]['regio'] === "3 Região Sudeste") {
        //     this.previSudeste.push(data['data'][obj]['bitos']);
        //   } else if (data['data'][obj]['regio'] === "4 Região Sul") {
        //     this.previSul.push(data['data'][obj]['bitos']);
        //   } else if (data['data'][obj]['regio'] === "5 Região Centro-Oeste") {
        //     this.previCentro.push(data['data'][obj]['bitos']);
        //   }
        // }
        
      for (var i = 0; i < this.mes.length; i++) {
        this.arrData.push([this.mes[i] + '/19', parseInt(this.Norte[i]), parseInt(this.Nordeste[i]), parseInt(this.Sudeste[i]), parseInt(this.Sul[i]), parseInt(this.Centro[i]),]);
      }

      this.drawChart();
  }

  drawChart = () => {
    var data = google.visualization.arrayToDataTable(this.arrData);
    var options = {
      width: 1220,
      height: 520,
      title: 'Previsão de obitos em ' + this.filtro.ano + ' do sexo ' + this.filtro.genero + ' de ' + this.filtro.faixaEtaria + ' todas as regiões',
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