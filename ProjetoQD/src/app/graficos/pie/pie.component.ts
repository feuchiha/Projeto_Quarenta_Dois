import { Component, ViewChild, ElementRef, OnInit, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { IFilter } from 'app/components/qd-filtro/filtro';
import { CardsComponent } from '../cards/cards.component';

declare var google: any;

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit, IFilter {
  arrData: any = [];
  Mas: any = [];
  Fem: any = [];
  filtro: any = [];
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

  constructor(private http: HttpClient, public toastr: ToastrManager, private viewContainerRef: ViewContainerRef) { }

  @Input() set name(name: string) {
    console.log("set")
    if (null != name) {
      this.filtro = name;
      this.drawChart();
    }
  }
  getParentComponent(): CardsComponent {
    return this.viewContainerRef['_data'].componentView.component.viewContainerRef['_view'].component
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
      faixaEtaria: ' 15 a 19 anos',
      mes: 'Jan',
      regio: '1 Região Norte'
    }
    this.getParentComponent().addObserver(this);
  }


  drawChart = () => {
    this.arrData = [];
    this.arrData.push(['Região', 'Valor Gasto']);
    this.Mas = [];
    this.Fem = [];
    this.options.title = `Custos de internação do sexo em ${this.filtro.faixaEtaria}`;

    this.chart = new google.visualization.PieChart(this.pieChart.nativeElement);

    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json')
    this.http.post(`http://localhost:3002/index/pie`,
      JSON.stringify(this.filtro), {
      headers: headers
    })
      .subscribe(data => {

        data['data'].filter(({ regio }) => {
          return regio != "Total";
        }).forEach(({ regio, valorServicoesHospitalares }) => {
          this.arrData.push([regio, parseInt(valorServicoesHospitalares)]);
        });

        var data1 = google.visualization.arrayToDataTable(this.arrData);
        this.chart.draw(data1, this.options);
      })
  }
}