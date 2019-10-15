import {  Directive, Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { PieComponent } from '../pie/pie.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
}) 
export class CardsComponent implements OnInit { 
  messageToSendP: string;
  ngOnInit(){}

  recebeFuncao(json){
    this.messageToSendP = json;
  }

  static Options = class {
    constructor(width: any, height: any){
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
