import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { GetParent } from './cards/parent.directive';
import { SidebarComponent } from '../components/sidebar/sidebar.component';


@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent extends SidebarComponent implements OnInit {

  ngOnInit() {
    if(this.loadSession()){
      this.token = JSON.parse(localStorage.getItem('usr'));
    }
  }

}