import { Component, ViewChild, ElementRef, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
declare var google: any;

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit, OnChanges {
  arrData: any = [];
  Mas: any = [];
  Fem: any = [];
  filtro: any = [];
  chart;

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

  constructor(private http: HttpClient, public toastr: ToastrManager) { }

  @Input() set name(name: string) {
    console.log("set")
    if (null != name) {
      this.filtro = name;
      this.drawChart();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("change")
    if (null != changes.name.currentValue) {
      this.filtro = changes.name.currentValue;
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
  }


  drawChart = () => {
    this.arrData = [];
    this.Mas = [];
    this.Fem = [];
    console.log(this.filtro.faixaEtaria);
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
        this.arrData.push(['Região', 'Valor Gasto']);
        for (let obj in data['data']) {
          if (data['data'][obj]['regio'] != "Total") {
            this.Mas.push(data['data'][obj]['regio']);
            this.Fem.push(data['data'][obj]['valorServicoesHospitalares']);
          }
        }
        for (var i = 0; i < this.Mas.length; i++) {
          this.arrData.push([this.Mas[i], parseInt(this.Fem[i])]);
        }
        var data1 = google.visualization.arrayToDataTable(this.arrData);
        this.chart.draw(data1, this.options);
      })
  }
}