import { Component, OnInit } from '@angular/core';
import { PieComponent } from '../pie/pie.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
 
export class CardsComponent extends PieComponent implements OnInit { 

  ngOnInit(){}

  recebeFuncao(json){
    this.filtroPie(json);
  }
}
