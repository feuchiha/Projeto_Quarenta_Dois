import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { stringify } from '@angular/compiler/src/util';
declare var google: any;

@Component({
  selector: 'app-line-custo',
  template: '<div #lineChart></div>',
  styleUrls: ['./line-custo.component.css']
})
export class LineCustoComponent implements OnInit {

  filtros = {ano:"", faixaEtaria:"", regio:""};
  arrData:any = [];
  Mas: any = [];
  Fem: any = [];
  meses: any = [];
  MasPredict: any = [];
  FemPredict: any = [];
  mesesPredit: any = [];

  @ViewChild('lineChart') lineChart: ElementRef

  constructor(private http: HttpClient, public toastr: ToastrManager) {
  }

  ngOnInit(): void {

    this.filtros = {
        ano: "2018",
        faixaEtaria: " 70 a 79 anos",
        regio: "3 Região Sudeste",
      }

      google.charts.load('current', { 'packages': ['corechart'] });
      const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json')
      this.http.post(`http://localhost:3002/index/line`,
        JSON.stringify(this.filtros),{
        headers: headers
      })
      .subscribe(data => {
        //console.log(data)
        this.arrData.push(['Mês', 'Masculino', 'Feminino']);
        for(let obj in data['data']){
          if(data['data'][obj]['genero'] == " Masc" ){
            this.meses.push(data['data'][obj]['mes'] , );
        }
          if(data['data'][obj]['genero'] === " Masc"){
            this.Mas.push(data['data'][obj]['valorServicoesHospitalares']);
          }else{
            this.Fem.push(data['data'][obj]['valorServicoesHospitalares']);
          } 
        }

        for(var i = 0;i < this.meses.length; i++){
          this.arrData.push([stringify(this.meses[i] +'/18'), parseInt(this.Mas[i]), parseInt(this.Fem[i])]);
        }
        this.predictBusca();
      })
        
    }


predictBusca(): void {

    this.filtros = {
      ano: "2019",
      faixaEtaria: " 70 a 79 anos",
      regio: "3 Região Sudeste",
    }

    google.charts.load('current', { 'packages': ['corechart'] });
    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json')
    this.http.post(`http://localhost:3002/index/linePredict`,
      JSON.stringify(this.filtros),{
      headers: headers
    })
    .subscribe(data => {
      //console.log(data)
      for(let obj in data['data']){
        if(data['data'][obj]['genero'] == " Masc" ){
          this.mesesPredit.push(data['data'][obj]['mes'] , );
      }
        if(data['data'][obj]['genero'] === " Masc"){
          this.MasPredict.push(data['data'][obj]['valorServicoesHospitalares']);
        }else{
          this.FemPredict.push(data['data'][obj]['valorServicoesHospitalares']);
        } 
      }

      for(var i = 0;i < this.mesesPredit.length; i++){
        this.arrData.push([stringify(this.mesesPredit[i] +'/19'), parseInt(this.MasPredict[i]), parseInt(this.FemPredict[i])]);
      }
      google.charts.setOnLoadCallback(this.drawChart);
    })
  }

drawChart = () => {
  var data = google.visualization.arrayToDataTable(this.arrData);
  const options = {      
    width: 1200,
    height: 520,
    title: 'Previsão dos custos de internações por genero de '+ this.filtros.faixaEtaria + ' em ' + this.filtros.ano + ' na ' + this.filtros.regio,
    curveType: 'function',
    legend: { 
      position: 'bottom' },
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
      chartArea:{left:'7%',top:'15%',width:'90%',height:'70%'}
  };
  const chart = new google.visualization.LineChart(this.lineChart.nativeElement);
  chart.draw(data, options);
}



}
