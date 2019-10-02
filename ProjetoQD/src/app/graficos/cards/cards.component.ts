import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PieComponent }  from '../pie/pie.component';
import { LineComponent } from '../line/line.component';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
 
export class CardsComponent extends PieComponent implements OnInit { 

  filtros = {
    ano: ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
    genero: [' Masc', ' Fem'],
    faixaEtaria: [" Menor 1 ano", " 1 a 4 anos", " 5 a 9 anos", " 10 a 14 anos", " 15 a 19 anos", " 20 a 29 anos", " 30 a 39 anos", " 40 a 49 anos", " 50 a 59 anos", " 60 a 69 anos", " 70 a 79 anos", " 80 anos e mais"],
    mes: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    regiao: ['1 Região Norte', '2 Região Nordeste', '3 Região Sudeste', '4 Região Sul', '5 Região Centro-Oeste']
  }

  pie: any = [];
  selected: any = [];
  element = { id: 'ano' };
  element2 = { id: 'genero' };
  element3 = { id: 'mes' };
  element4 = { id: 'faixa' };

  filtro = {
    ano: '2018',
    genero: ' Masc',
    faixaEtaria: ' 15 a 19 anos',
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
    console.log(JSON.stringify(this.filtro));
    this.filtroPie(this.filtro);
  }

  ngOnInit(){
    
  }

}
