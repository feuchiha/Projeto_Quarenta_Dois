import { Component, OnInit } from '@angular/core';
import { IFilter } from 'app/components/qd-filtro/filtro';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
}) 
export class CardsComponent implements OnInit {  

  messageToSendP: string;  

  private observers: IFilter[];
  static http: any;

  ngOnInit() { }

  constructor() {
    this.observers = []
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

  static Options = class {
    constructor(width: any, height: any) {
      this.width = width;
      this.height = height;
    }
    width: BigInteger;
    height: BigInteger;
    is3D: true;
    hAxis: {
      textStyle: {
        color: String
      },
      titleTextStyle: {
        color: String
      }
    };
    vAxis: {
      textStyle: {
        color: '#0baeb7'
      },
      titleTextStyle: {
        color: '#0baeb7'
      }
    };
    title: String;
    legend: { position: 'top', maxLines: 3 };
    chartArea: { left: '12%', top: '25%', width: '65%', height: '75%' }
  }
}
