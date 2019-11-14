import { Component, OnInit, Input, Output, AfterViewInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-qd-filtro',
  templateUrl: './qd-filtro.component.html',
  styleUrls: ['./qd-filtro.component.css']
})
export class QdFiltroComponent implements OnInit {
  @Output() filtroEmitter = new EventEmitter();
  @Input() utilizaAno:Boolean;
  filtros = {
    ano: ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
    genero: ['Todos', ' Masc', ' Fem'],
    faixaEtaria: [" Menor 1 ano", " 1 a 4 anos", " 5 a 9 anos", " 10 a 14 anos", " 15 a 19 anos", " 20 a 29 anos", " 30 a 39 anos", " 40 a 49 anos", " 50 a 59 anos", " 60 a 69 anos", " 70 a 79 anos", " 80 anos e mais"],
    mes: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    regio: ['1 Região Norte', '2 Região Nordeste', '3 Região Sudeste', '4 Região Sul', '5 Região Centro-Oeste']
  }

  pie: any = [];
  selected: any = [];
  element = { id: 'ano' };
  element2 = { id: 'genero' };
  element3 = { id: 'mes' };
  element4 = { id: 'faixa' };
  element5 = { id: 'regiao' };

  filtro = {
    ano: '2018',
    genero: ' Masc',
    faixaEtaria: ' 70 a 79 anos',
    mes: 'Jan',
    regio: '1 Região Norte'
  }

  onSelect(val: string) {
    if (val) {
      for (let filtro in this.filtros) {
        if (this.filtros[filtro].includes(val)) {
          this[filtro] = val;
          this.filtro[filtro] = val;
        }
      }
    }

  }

  onFiltra() {
    this.filtroEmitter.emit(this.filtro);
  }

  ngOnInit(){
    
  }
 
}