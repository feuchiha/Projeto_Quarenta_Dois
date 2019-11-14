import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, Input, ViewContainerRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { stringify } from '@angular/compiler/src/util';
import { IFilter } from 'app/components/qd-filtro/filtro';
import { Card } from '../cards/card';
import { RequisitonService } from '../cards/requisition.service';
import { GetParent } from '../cards/parent.directive';
import { S } from '@angular/cdk/keycodes';
declare var google: any;

@Component({
  selector: 'app-area',
  template: '<div #areaChart></div>',
  styleUrls: ['./area.component.scss']
})


export class AreaComponent implements OnInit, IFilter, Card {
  http: HttpClient;

  endpoint: string = "";
  // filtro = {faixaEtaria:"", ano:"", genero:""};
  filtro: any = [];
  arrData: any = [];
  Norte: any = [];
  Nordeste: any = [];
  Sudeste: any = [];
  Sul: any = [];
  Centro: any = [];
  mes: any = [];

  chart;

  options = {
    width: 620,
    height: 520,
    title: 'Obitos em ' + this.filtro.ano + ' do sexo ' + this.filtro.genero + ' de ' + this.filtro.faixaEtaria + ' todas as regiões',
    // backgroundColor: 'white',
    legend: { position: 'top', maxLines: 3 },
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
  };

  @ViewChild('areaChart') areaChart: ElementRef

  atualizarFiltro(filtro: string): void {
    if (null != filtro) {
      this.filtro = filtro;
      this.drawChart();
    }
  }

  constructor(http: HttpClient, public toastr: ToastrManager, private viewContainerRef: ViewContainerRef) {
    this.http = http;
    this.endpoint = "area";
  }

  ngOnInit(): void {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.load("visualization", "1", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(this.drawChart);

    this.filtro = {
      faixaEtaria: " 70 a 79 anos",
      ano: "2008",
      genero: " Masc"
    }

    GetParent.addObserverToFilter(this);
  }

  drawChart = () => {
    this.arrData = [];
    this.Norte = [];
    this.Nordeste = [];
    this.Sudeste = [];
    this.Sul = [];
    this.Centro = [];
    this.mes = [];

    this.options.title = 'Internações em ' + this.filtro.ano + ' do sexo ' + this.filtro.genero + ' de ' + this.filtro.faixaEtaria;

    this.chart = new google.visualization.AreaChart(this.areaChart.nativeElement);

    RequisitonService.montaGrafico(this);
  }


  montaGrafico(data: any) {

    this.arrData.push(['Mês', 'Norte', 'Nordeste', 'Sudeste', 'Sul', 'Centro-Oeste']);

    if (this.filtro.genero == 'Todos') {
      var valor = new Valor(data['data']);

      this.calculaNorte(valor);
      this.calculaNordeste(valor);
      this.calculaSuldeste(valor);
      this.calculaSul(valor);
      this.calculaCentroOeste(valor);

    } else {

      data['data'].filter(({ regio }) => {
        return "1 Região Norte" === regio
      }).forEach(({ mes , internacoes }) => {
        this.mes.push(mes);
        this.Norte.push(internacoes);
      });

      data['data'].filter(({ regio }) => {
        return "2 Região Nordeste" === regio
      }).forEach(({ internacoes }) => {
        this.Nordeste.push(internacoes);
      });

      data['data'].filter(({ regio }) => {
        return "3 Região Sudeste" === regio
      }).forEach(({ internacoes }) => {
        this.Sudeste.push(internacoes);
      });

      data['data'].filter(({ regio }) => {
        return "4 Região Sul" === regio
      }).forEach(({ internacoes }) => {
        this.Sul.push(internacoes);
      });

      data['data'].filter(({ regio }) => {
        return "5 Região Centro-Oeste" === regio
      }).forEach(({ internacoes }) => {
        this.Centro.push(internacoes);
      });

    }   

    for (var i = 0; i < this.mes.length; i++) {
      this.arrData.push([this.mes[i], parseInt(this.Norte[i]), parseInt(this.Nordeste[i]), parseInt(this.Sudeste[i]), parseInt(this.Sul[i]), parseInt(this.Centro[i]),]);
    }

    var data1 = google.visualization.arrayToDataTable(this.arrData);
    this.chart.draw(data1, this.options);

  }

  calculaNorte(valor){
    var objetoFem = valor.feminino().janeiro().norte().buscar();
    var objetoMasc = valor.masculino().janeiro().norte().buscar();
  
    this.adicionaNorte(valor.meses.JANEIRO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().fevereiro().norte().buscar();
    objetoMasc = valor.masculino().fevereiro().norte().buscar();

    this.adicionaNorte(valor.meses.FEVEREIRO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().marco().norte().buscar();
    objetoMasc = valor.masculino().marco().norte().buscar();
    
    this.adicionaNorte(valor.meses.MARCO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().abril().norte().buscar();
    objetoMasc = valor.masculino().abril().norte().buscar();
    
    this.adicionaNorte(valor.meses.ABRIL, objetoFem, objetoMasc);

    objetoFem = valor.feminino().maio().norte().buscar();
    objetoMasc = valor.masculino().maio().norte().buscar();
    
    this.adicionaNorte(valor.meses.MAIO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().junho().norte().buscar();
    objetoMasc = valor.masculino().junho().norte().buscar();
    
    this.adicionaNorte(valor.meses.JUNHO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().julho().norte().buscar();
    objetoMasc = valor.masculino().julho().norte().buscar();
    
    this.adicionaNorte(valor.meses.JULHO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().agosto().norte().buscar();
    objetoMasc = valor.masculino().agosto().norte().buscar();
    
    this.adicionaNorte(valor.meses.AGOSTO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().setembro().norte().buscar();
    objetoMasc = valor.masculino().setembro().norte().buscar();
    
    this.adicionaNorte(valor.meses.SETEMBRO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().outubro().norte().buscar();
    objetoMasc = valor.masculino().outubro().norte().buscar();
    
    this.adicionaNorte(valor.meses.OUTUBRO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().novembro().norte().buscar();
    objetoMasc = valor.masculino().novembro().norte().buscar();    
    this.adicionaNorte(valor.meses.NOVEMBRO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().dezembro().norte().buscar();
    objetoMasc = valor.masculino().dezembro().norte().buscar();    
    this.adicionaNorte(valor.meses.DEZEMBRO, objetoFem, objetoMasc);
  }

  calculaNordeste(valor){
    var objetoFem = valor.feminino().janeiro().nordeste().buscar();
    var objetoMasc = valor.masculino().janeiro().nordeste().buscar();

    this.adicionaNordeste(valor.meses.JANEIRO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().fevereiro().nordeste().buscar();
    objetoMasc = valor.masculino().fevereiro().nordeste().buscar();

    this.adicionaNordeste(valor.meses.FEVEREIRO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().marco().nordeste().buscar();
    objetoMasc = valor.masculino().marco().nordeste().buscar();
    
    this.adicionaNordeste(valor.meses.MARCO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().abril().nordeste().buscar();
    objetoMasc = valor.masculino().abril().nordeste().buscar();
    
    this.adicionaNordeste(valor.meses.ABRIL, objetoFem, objetoMasc);

    objetoFem = valor.feminino().maio().nordeste().buscar();
    objetoMasc = valor.masculino().maio().nordeste().buscar();
    
    this.adicionaNordeste(valor.meses.MAIO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().junho().nordeste().buscar();
    objetoMasc = valor.masculino().junho().nordeste().buscar();
    
    this.adicionaNordeste(valor.meses.JUNHO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().julho().nordeste().buscar();
    objetoMasc = valor.masculino().julho().nordeste().buscar();
    
    this.adicionaNordeste(valor.meses.JULHO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().agosto().nordeste().buscar();
    objetoMasc = valor.masculino().agosto().nordeste().buscar();
    
    this.adicionaNordeste(valor.meses.AGOSTO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().setembro().nordeste().buscar();
    objetoMasc = valor.masculino().setembro().nordeste().buscar();
    
    this.adicionaNordeste(valor.meses.SETEMBRO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().outubro().nordeste().buscar();
    objetoMasc = valor.masculino().outubro().nordeste().buscar();
    
    this.adicionaNordeste(valor.meses.OUTUBRO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().novembro().nordeste().buscar();
    objetoMasc = valor.masculino().novembro().nordeste().buscar();    
    this.adicionaNordeste(valor.meses.NOVEMBRO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().dezembro().nordeste().buscar();
    objetoMasc = valor.masculino().dezembro().nordeste().buscar();    
    this.adicionaNordeste(valor.meses.DEZEMBRO, objetoFem, objetoMasc);
  }

  calculaSuldeste(valor){
    var objetoFem = valor.feminino().janeiro().suldeste().buscar();
    var objetoMasc = valor.masculino().janeiro().suldeste().buscar();

    this.adicionaSuldeste(valor.meses.suldeste, objetoFem, objetoMasc);

    objetoFem = valor.feminino().fevereiro().suldeste().buscar();
    objetoMasc = valor.masculino().fevereiro().suldeste().buscar();

    this.adicionaSuldeste(valor.meses.FEVEREIRO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().marco().suldeste().buscar();
    objetoMasc = valor.masculino().marco().suldeste().buscar();
    
    this.adicionaSuldeste(valor.meses.MARCO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().abril().suldeste().buscar();
    objetoMasc = valor.masculino().abril().suldeste().buscar();
    
    this.adicionaSuldeste(valor.meses.ABRIL, objetoFem, objetoMasc);

    objetoFem = valor.feminino().maio().suldeste().buscar();
    objetoMasc = valor.masculino().maio().suldeste().buscar();
    
    this.adicionaSuldeste(valor.meses.MAIO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().junho().suldeste().buscar();
    objetoMasc = valor.masculino().junho().suldeste().buscar();
    
    this.adicionaSuldeste(valor.meses.JUNHO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().julho().suldeste().buscar();
    objetoMasc = valor.masculino().julho().suldeste().buscar();
    
    this.adicionaSuldeste(valor.meses.JULHO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().agosto().suldeste().buscar();
    objetoMasc = valor.masculino().agosto().suldeste().buscar();
    
    this.adicionaSuldeste(valor.meses.AGOSTO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().setembro().suldeste().buscar();
    objetoMasc = valor.masculino().setembro().suldeste().buscar();
    
    this.adicionaSuldeste(valor.meses.SETEMBRO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().outubro().suldeste().buscar();
    objetoMasc = valor.masculino().outubro().suldeste().buscar();
    
    this.adicionaSuldeste(valor.meses.OUTUBRO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().novembro().suldeste().buscar();
    objetoMasc = valor.masculino().novembro().suldeste().buscar();    
    this.adicionaSuldeste(valor.meses.NOVEMBRO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().dezembro().suldeste().buscar();
    objetoMasc = valor.masculino().dezembro().suldeste().buscar();    
    this.adicionaSuldeste(valor.meses.DEZEMBRO, objetoFem, objetoMasc);
  }

  calculaSul(valor){
    var objetoFem = valor.feminino().janeiro().sul().buscar();
    var objetoMasc = valor.masculino().janeiro().sul().buscar();

    this.adicionaSul(valor.meses.suldeste, objetoFem, objetoMasc);

    objetoFem = valor.feminino().fevereiro().sul().buscar();
    objetoMasc = valor.masculino().fevereiro().sul().buscar();

    this.adicionaSul(valor.meses.FEVEREIRO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().marco().sul().buscar();
    objetoMasc = valor.masculino().marco().sul().buscar();
    
    this.adicionaSul(valor.meses.MARCO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().abril().sul().buscar();
    objetoMasc = valor.masculino().abril().sul().buscar();
    
    this.adicionaSul(valor.meses.ABRIL, objetoFem, objetoMasc);

    objetoFem = valor.feminino().maio().sul().buscar();
    objetoMasc = valor.masculino().maio().sul().buscar();
    
    this.adicionaSul(valor.meses.MAIO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().junho().sul().buscar();
    objetoMasc = valor.masculino().junho().sul().buscar();
    
    this.adicionaSul(valor.meses.JUNHO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().julho().sul().buscar();
    objetoMasc = valor.masculino().julho().sul().buscar();
    
    this.adicionaSul(valor.meses.JULHO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().agosto().sul().buscar();
    objetoMasc = valor.masculino().agosto().sul().buscar();
    
    this.adicionaSul(valor.meses.AGOSTO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().setembro().sul().buscar();
    objetoMasc = valor.masculino().setembro().sul().buscar();
    
    this.adicionaSul(valor.meses.SETEMBRO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().outubro().sul().buscar();
    objetoMasc = valor.masculino().outubro().sul().buscar();
    
    this.adicionaSul(valor.meses.OUTUBRO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().novembro().sul().buscar();
    objetoMasc = valor.masculino().novembro().sul().buscar();    
    this.adicionaSul(valor.meses.NOVEMBRO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().dezembro().sul().buscar();
    objetoMasc = valor.masculino().dezembro().sul().buscar();    
    this.adicionaSul(valor.meses.DEZEMBRO, objetoFem, objetoMasc);
  }

  calculaCentroOeste(valor){
    var objetoFem = valor.feminino().janeiro().centroOeste().buscar();
    var objetoMasc = valor.masculino().janeiro().centroOeste().buscar();

    this.adicionaCentroOeste(valor.meses.suldeste, objetoFem, objetoMasc);

    objetoFem = valor.feminino().fevereiro().centroOeste().buscar();
    objetoMasc = valor.masculino().fevereiro().centroOeste().buscar();

    this.adicionaCentroOeste(valor.meses.FEVEREIRO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().marco().centroOeste().buscar();
    objetoMasc = valor.masculino().marco().centroOeste().buscar();
    
    this.adicionaCentroOeste(valor.meses.MARCO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().abril().centroOeste().buscar();
    objetoMasc = valor.masculino().abril().centroOeste().buscar();
    
    this.adicionaCentroOeste(valor.meses.ABRIL, objetoFem, objetoMasc);

    objetoFem = valor.feminino().maio().centroOeste().buscar();
    objetoMasc = valor.masculino().maio().centroOeste().buscar();
    
    this.adicionaCentroOeste(valor.meses.MAIO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().junho().centroOeste().buscar();
    objetoMasc = valor.masculino().junho().centroOeste().buscar();
    
    this.adicionaCentroOeste(valor.meses.JUNHO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().julho().centroOeste().buscar();
    objetoMasc = valor.masculino().julho().centroOeste().buscar();
    
    this.adicionaCentroOeste(valor.meses.JULHO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().agosto().centroOeste().buscar();
    objetoMasc = valor.masculino().agosto().centroOeste().buscar();
    
    this.adicionaCentroOeste(valor.meses.AGOSTO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().setembro().centroOeste().buscar();
    objetoMasc = valor.masculino().setembro().centroOeste().buscar();
    
    this.adicionaCentroOeste(valor.meses.SETEMBRO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().outubro().centroOeste().buscar();
    objetoMasc = valor.masculino().outubro().centroOeste().buscar();
    
    this.adicionaCentroOeste(valor.meses.OUTUBRO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().novembro().centroOeste().buscar();
    objetoMasc = valor.masculino().novembro().centroOeste().buscar();    
    this.adicionaCentroOeste(valor.meses.NOVEMBRO, objetoFem, objetoMasc);

    objetoFem = valor.feminino().dezembro().centroOeste().buscar();
    objetoMasc = valor.masculino().dezembro().centroOeste().buscar();    
    this.adicionaCentroOeste(valor.meses.DEZEMBRO, objetoFem, objetoMasc);
  }

  getPosicao(array){
    for (let i = 0; i < array.length + 1; i++) {
      if (typeof array[i] === 'undefined' || array[i] == null){
        return i;
      }
    }
  }

  adicionaNorte(meses, objetoFem, objetoMasc){
    this.mes.push(meses); 
    this.Norte[this.getPosicao(this.Norte)] = parseInt(objetoFem.internacoes) + parseInt(objetoMasc.internacoes);

  }

  adicionaNordeste(meses, objetoFem, objetoMasc){
    // this.mes.push(meses);
    this.Nordeste[this.getPosicao(this.Nordeste)] = parseInt(objetoFem.internacoes) + parseInt(objetoMasc.internacoes);
  }

  adicionaSuldeste(meses, objetoFem, objetoMasc){
    // this.mes.push(meses);
    this.Sudeste[this.getPosicao(this.Sudeste)] = parseInt(objetoFem.internacoes) + parseInt(objetoMasc.internacoes);
  }

  adicionaSul(meses, objetoFem, objetoMasc){
    // this.mes.push(meses);
    this.Sul[this.getPosicao(this.Sul)] = parseInt(objetoFem.internacoes) + parseInt(objetoMasc.internacoes);
  }

  adicionaCentroOeste(meses, objetoFem, objetoMasc){
    // this.mes.push(meses);
    this.Centro[this.getPosicao(this.Centro)] = parseInt(objetoFem.internacoes) + parseInt(objetoMasc.internacoes);
  }


}

class Valor {

  data = [];

  genero = {
    MASC: " Masc",
    FEM: " Fem",
  }

  regiao = {
    NORTE: "1 Região Norte",
    NORDESTE: "2 Região Nordeste",
    SUDESTE: "3 Região Sudeste",
    SUL: "4 Região Sul",
    CENTRO_OESTE: "5 Região Centro-Oeste"
  }

  meses = {
    JANEIRO: "Jan",
    FEVEREIRO: "Fev",
    MARCO: "Mar",
    ABRIL: "Abr",
    MAIO: "Mai",
    JUNHO: "Jun",
    JULHO: "Jul",
    AGOSTO: "Ago",
    SETEMBRO: "Set",
    OUTUBRO: "Out",
    NOVEMBRO: "Nov",
    DEZEMBRO: "Dez"
  }

  generoBusca;
  regiaoBusca;
  mesBusca;

  constructor(data) {
    this.data = data;
  }

  masculino(): Valor {
    this.generoBusca = this.genero.MASC;
    return this;
  }

  feminino(): Valor {
    this.generoBusca = this.genero.FEM;
    return this;
  }

  norte(): Valor {
    this.regiaoBusca = this.regiao.NORTE;
    return this;
  }

  nordeste(): Valor {
    this.regiaoBusca = this.regiao.NORDESTE;
    return this;
  }

  suldeste(): Valor {
    this.regiaoBusca = this.regiao.SUDESTE;
    return this;
  }

  sul(): Valor {
    this.regiaoBusca = this.regiao.SUL;
    return this;
  }

  centroOeste(): Valor {
    this.regiaoBusca = this.regiao.CENTRO_OESTE;
    return this;
  }

  janeiro(): Valor {
    this.mesBusca = this.meses.JANEIRO;
    return this;
  }

  fevereiro(): Valor {
    this.mesBusca = this.meses.FEVEREIRO;
    return this;
  }

  marco(): Valor {
    this.mesBusca = this.meses.MARCO;
    return this;
  }

  abril(): Valor {
    this.mesBusca = this.meses.ABRIL;
    return this;
  }

  maio(): Valor {
    this.mesBusca = this.meses.MAIO;
    return this;
  }

  junho(): Valor {
    this.mesBusca = this.meses.JUNHO;
    return this;
  }

  julho() {
    this.mesBusca = this.meses.JULHO;
    return this;
  }

  agosto(): Valor {
    this.mesBusca = this.meses.AGOSTO;
    return this;
  }

  setembro(): Valor {
    this.mesBusca = this.meses.SETEMBRO;
    return this;
  }

  outubro(): Valor {
    this.mesBusca = this.meses.OUTUBRO;
    return this;
  }

  novembro(): Valor {
    this.mesBusca = this.meses.NOVEMBRO;
    return this;
  }

  dezembro(): Valor {
    this.mesBusca = this.meses.DEZEMBRO;
    return this;
  }

  buscar() {
    return this.data.find(({ mes, regio, genero }) => {
      return this.generoBusca === genero && this.regiaoBusca === regio && this.mesBusca === mes;
    });
  }
}