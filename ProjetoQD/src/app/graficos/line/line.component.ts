import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
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
  ages:any = [];
  arrData:any = [];
  arrCab: any = [];
  arrValues: any = [];
  //Mas: any = [];
  //Fem: any = [];
  //ano: any = [];
  Mas: any = [0,1, 4, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0,0,0,0,0,0,1,3,0,0,4,0,0,0,0,0,0,0,1,2,0,1,4,1,0,1,0,0,2,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,1,0,0, 1, 0, 2, 0, 1, 0, 3, 0, 0, 2, 0, 0, 2, 0, 1, 2, 1, 0, 4];
  Fem: any = [ 0.013, 0.997, 3.778,-0.222,-0.089, 4.954,-0.055, 0.046,-0.099, 0.023,-0.077, 0.089,-0.044, 0.998,-0.028,-0.029,-0.064, 1.001,-0.027, 0.095,-0.077, 0.024,-0.013,-0.214,-0.106, 0.205, 0.246, 0.053,-0.028, 0.596,-0.006,-0.038, 1.16 ,-0.07 ,-0.033, 1.052, 0.022, 0.129, 0.061, 0.05 , 0.014, 0.056,-0.043,-0.072,-0.092,-0.023,-0.074,-0.166, 0.061,-0.036, 1.229, 0.046, 0.02 , 1.108,-0.042,-0.045,-0.028,-0.015,-0.085, 0.036, 0.015,-0.036,-0.039, 0.029,-0.037, 0.083,-0.038, 0.075,-0.001, 0.012, 0.016,-0.011, 0.036, 1.227,-0.001,-0.071, 0.08 , 1.039, 0.029,-0.002, 0.21 , 0.006, 0.081, 0.148,-0.034, 1.136, 3.949,-0.065,-0.072, 4.346, 0.067, 0.002, 0.006, 0.034, 0.013, 0.126, 0.036, 1.056, 1.747,-0.09 , 0.935, 4.218, 1.046,-0.111, 1.113,-0.016,-0.054, 2.135, 0.087, 0.056, 0.098, 0.031, 0.069, 0.098,-0.096,-0.028,-0.115, 1.334,-0.065, 0.958,-0.025, 0.036, 0.103, 0.015, 0.056, 0.316,-0.011,-0.078,-0.076, 1.394,-0.042, 1.12 ,-0.02 , 0.091, 0.798, 0.028, 0.033, 0.944, 0.035, 1.994,-0.134, 1.086, 0.034, 3.015,-0.107, 0.001, 0.512, 0.032,-0.055, 0.513, 0.01 , 1.173, 1.907, 1.251,-0.022, 4.222];
  ano: any = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80','81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','96','97','98','99','100','101','102','103','104','105','106','107','108','109','110','111','112','113','114','115','116','117','118','119','120','121','122','123','124','125','126','127','128','129','130','131','132','133','134','135','136','137','138','139','140','141','142','143','144','145','146','147','148','149','150','151','152','153','154','155','156'];
  /*
  Mas: any = [11,66,86,55,23,241,10,60,68,30,189];
  Fem: any = [21, 96, 114, 42, 39, 288, 18,59, 90, 30, 14, 30];
  ano: any = ['1', '2', '3', '4', '5', '6','7','8','9','10','11','12'];
*/
  @ViewChild('lineChart') lineChart: ElementRef

  constructor(private http: HttpClient, public toastr: ToastrManager) {
  }

  ngOnInit(): void {
    /*
        google.charts.load('current', { 'packages': ['corechart'] });
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json')
        this.http.post(`http://localhost:3002/index/bases`,{
          headers: headers
        })
        .subscribe(data => {

          this.arrData.push(['Regiao', 'Masculino', 'Feminino']);
          for(let obj in data['data']){
            if(data['data'][obj]['Regi?o'] === "total" && data['data'][obj]['Genero'] === "Mas"){
              this.ano.push(data['data'][obj]['Ano']);
          }
              if(data['data'][obj]['Regi?o'] === "total" ){
                  if(data['data'][obj]['Genero'] === "Mas"){
                    this.Mas.push(data['data'][obj]['?bitos']);
                  }else{
                    this.Fem.push(data['data'][obj]['?bitos']);
                  }     

              
            }
          }
          */
         this.arrData.push(['Regiao', 'Atual', 'Preditado']);
          for(var i = 0;i < this.ano.length; i++){
            this.arrData.push([stringify(this.ano[i]), parseInt(this.Mas[i]), parseInt(this.Fem[i])]);
          }
          google.charts.setOnLoadCallback(this.drawChart);
          //console.log(this.arrData)
        //})
      }

  Selectages(): void {
    google.charts.load('current', { 'packages': ['corechart'] });
    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json')
    this.http.post(`http://localhost:3002/Mysql/ages`,{
      headers: headers
    })
    .subscribe(data => {
      for (const k in data) {
        const element = data[k];
        this.ages.push((element['idades']));
      }
    })
  }

  drawChart = () => {
    var data = google.visualization.arrayToDataTable(this.arrData);
    const options = {      
      width: 1200,
      height: 520,
      title: 'Total de obitos por genero de 2013 a 2018',
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
        chartArea:{left:'12%',top:'10%',width:'80%',height:'75%'}
    };

    const chart = new google.visualization.LineChart(this.lineChart.nativeElement);
    chart.draw(data, options);
  }

}