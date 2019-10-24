import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { IFilter } from 'app/components/qd-filtro/filtro';


@Component({
  selector: 'app-previsoes',
  templateUrl: './previsoes.component.html',
  styleUrls: ['./previsoes.component.css']
})

export class PrevisoesComponent extends SidebarComponent implements OnInit {
  private observers: IFilter[]=[];
  
  
  ngOnInit() {
    if (this.loadSession()) {
      this.token = JSON.parse(localStorage.getItem('usr'));
      console.log(this.token);
    }
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
