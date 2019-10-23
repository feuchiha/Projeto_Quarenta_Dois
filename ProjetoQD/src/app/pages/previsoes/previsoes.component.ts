import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-previsoes',
  templateUrl: './previsoes.component.html',
  styleUrls: ['./previsoes.component.css']
})
export class PrevisoesComponent extends SidebarComponent implements OnInit {
  
  ngOnInit() {
    if (this.loadSession()) {
      this.token = JSON.parse(localStorage.getItem('usr'));
      console.log(this.token);
    }
  }

}
