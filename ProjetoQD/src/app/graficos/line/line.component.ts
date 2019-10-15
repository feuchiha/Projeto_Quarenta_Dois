import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { stringify } from '@angular/compiler/src/util';
declare var google: any;

@Component({
  selector: 'app-line',
  template: '<div #lineChart></div>',
  styleUrls: ['./line.component.scss']
})

export class LineComponent implements OnInit {
  // filtros = {ano:"", faixaEtaria:"", regio:""};
  filtros: any = [];
  arrData: any = [];
  Mas: any = [];
  Fem: any = [];
  meses: any = [];
  chart;

  options = {
    width: 620,
    height: 520,
    title: 'Total de obitos por genero de ' + this.filtros.faixaEtaria + " no ano de " + this.filtros.ano + ' na ' + this.filtros.regio,
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
    chartArea: { left: '12%', top: '10%', width: '80%', height: '75%' }
  };

  @Input() set name(name: string) {
    console.log("set")
    if (null != name) {
      this.filtros = name;
      this.drawChart();
    }
  }

  @ViewChild('lineChart') lineChart: ElementRef

  constructor(private http: HttpClient, public toastr: ToastrManager) {
  }

  ngOnInit(): void {

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.load("visualization", "1", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(this.drawChart);

    this.filtros = {
      ano: "2018",
      faixaEtaria: " 30 a 39 anos",
      regio: "1 Região Norte",
    }
  }

  drawChart = () => {
    this.arrData = [];
    this.Mas = [];
    this.Fem = [];
    this.meses = [];

    this.options.title = 'Total de obitos por genero de ' + this.filtros.faixaEtaria + " no ano de " + this.filtros.ano + ' na ' + this.filtros.regio;

    this.chart = new google.visualization.LineChart(this.lineChart.nativeElement);

    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json')
    this.http.post(`http://localhost:3002/index/line`,
      JSON.stringify(this.filtros), {
      headers: headers
    })
      .subscribe(data => {
        this.arrData.push(['Mês', 'Masculino', 'Feminino']);
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
          this.arrData.push([stringify(this.meses[i]), parseInt(this.Mas[i]), parseInt(this.Fem[i])]);
        }
        var data1 = google.visualization.arrayToDataTable(this.arrData);
        this.chart.draw(data1, this.options);
      })
  }

}