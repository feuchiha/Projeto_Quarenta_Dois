import { Component, OnInit } from '@angular/core';
import { IFilter } from 'app/components/qd-filtro/filtro';

@Component({
  selector: 'app-previsoes',
  templateUrl: './previsoes.component.html',
  styleUrls: ['./previsoes.component.css']
})
export class PrevisoesComponent implements OnInit {
  private observers: IFilter[];
  
  constructor() { }

  ngOnInit() {
  }

  recebeFuncao(json) {
    this.notifyObservers(json);
  }

  addObserver(ob: IFilter) {
    this.observers.push(ob)
  }

  notifyObservers(json) {
    this.observers.map((observer) => observer.atualizarFiltro(json))
  }


}
