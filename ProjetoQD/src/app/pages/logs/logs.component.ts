import {Component,  OnInit} from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { of as observableOf } from 'rxjs'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';



export interface DialogData {
  titulo: string;
  dataInsercao: string;
  // totalLinhas: string;
  inserido: boolean;
  lugar : string;
  campos: string[];
}

const table: DialogData[] = [
  {titulo:"Unidades Básicas de Saúde em Construção",
   dataInsercao:"28/12/2018",
   inserido:true,
   lugar:'http://lugarAleatorio.com.br/dataset/lugaresAleatorios',
   campos:["Código Cnes", "Latitude", "Longitude",
          "Nome Fantasia", "Nome Logradouro", "Número do Endereço", "Nome do Bairro",
          "Número de Telefone", "Código CEP", "UF", "Cidade"]},
          {titulo:"Unidades Básicas de Saúde em Construção",
   dataInsercao:"28/12/2018",
   inserido:false,
   lugar:'Arquivo',
   campos:["Código Cnes", "Latitude", "Longitude",
           "Nome Fantasia", "Nome Logradouro", "Número do Endereço", "Nome do Bairro",
           "Número de Telefone", "Código CEP", "UF", "Cidade"]}
  ]

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})



export class LogsComponent implements OnInit {

  token:  {email:"",name:"", perfil: any, token:""};

  constructor(private http: HttpClient, public toastr: ToastrManager) {
    this.token = JSON.parse(localStorage.getItem('usr'));
  }

  ngOnInit(){
    if(this.token != null){
      const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
      this.http.post(`http://localhost:3002/login/verifytoken`, 
      JSON.stringify(this.token), {
      headers: headers
      })
      .subscribe(data => {
        console.log(data);
        if(data['success'] === false){
          window.location.href = 'http://localhost:4200/#/app/visualizacao-dados'
      }
    })
  }else{
    window.location.href = 'http://localhost:4200/#/app/visualizacao-dados'
  }
}


  displayedColumns = ['titulo', 'Data de Insercao',  'Adicionado','Fonte'];
  dataSource = new ExampleDataSource();
  
  public isExpanded = false;
isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;
  cellClicked(row) {
    if (row.element == this.expandedElement) {
      return 'expanded' 
    }
     return 'collapsed'
  }
}



export class ExampleDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<DialogData[]> {
    
    const rows = [];
    table.forEach(element => rows.push(element, {detailRow: false, element }));

    return observableOf(rows);
  }

  disconnect() { }
}