import {Component} from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { of as observableOf } from 'rxjs'
import { Observable } from 'rxjs';

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}


export interface DialogData {
  titulo: string;
  dataInsercao: string;
  totalLinhas: string;
  campos: [string];
}

const table = {
  titulo:"Unidades Básicas de Saúde em Construção",
  dataInsercao:"28/12/2018",
  totalLinhas:40613,
  campos:["Código Cnes", "Latitude", "Longitude",
          "Nome Fantasia", "Nome Logradouro", "Número do Endereço", "Nome do Bairro",
          "Número de Telefone", "Código CEP", "UF", "Cidade"]
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', description:'A'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',description:'B'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li',description:'C'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be',description:'D'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', description:'E'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C',description:'F'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', description:'G'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', description:'H'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', description:'I'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', description:'J'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na', description:'K'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg', description:'L'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al', description:'M'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si', description:'N'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P', description:'O'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S', description:'P'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl', description:'Q'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar', description:'R'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K', description:'S'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca',description:'T'},
];

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
export class LogsComponent {

  displayedColumns = ['position', 'name', 'weight', 'symbol'];
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
  connect(): Observable<Element[]> {
    
    const rows = [];
    ELEMENT_DATA.forEach(element => rows.push(element, {detailRow: false, element }));
    return observableOf(rows);
  }

  disconnect() { }
}