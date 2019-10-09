import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CardsComponent } from '../cards/cards.component'
declare var google: any;

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})

export class PieComponent implements OnInit {
  arrData: any = [];
  Mas: any = [];
  Fem: any = [];
  filtro: any = [];
  chart;

  constructor(private http: HttpClient, public toastr: ToastrManager) {
  }

  @ViewChild('pieChart') pieChart: ElementRef
  
  ngOnInit(): void {

    this.filtro = {
      ano: '2018',
      genero: ' Masc',
      faixaEtaria: ' 15 a 19 anos',
      mes: 'Jan',
      regio: '1 Região Norte'
    }
    this.buscaPie(this.filtro)
  }

    buscaPie(filtro) {

    google.charts.load('current', { 'packages': ['corechart'] });
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json')
    this.http.post(`http://localhost:3002/index/pie`,
      JSON.stringify(filtro), {
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
        //console.log(this.Fem);
        google.charts.setOnLoadCallback(this.drawChart);
      })
  }

 

  drawChart = () => {

    var data = google.visualization.arrayToDataTable(this.arrData);
    const options = {
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

    this.chart = new google.visualization.PieChart(this.pieChart.nativeElement);

    this.chart.draw(data, options);
  }
   
  filtroPie(filtro){ 
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json')
    this.http.post(`http://localhost:3002/index/pie`,
      JSON.stringify(filtro), {
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

        const options = {
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
          title: `Custos de internação do sexo em ${filtro.faixaEtaria}`,
          legend: { position: 'top', maxLines: 3 },
          chartArea: { left: '12%', top: '25%', width: '65%', height: '75%' }
        };
        
        this.chart.draw(data1, options);
    })
  }
}