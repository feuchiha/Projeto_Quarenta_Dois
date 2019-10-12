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
  recebeFiltro;



  recebeFuncao(json){
    this.messageToSendP = json;
  }
}
