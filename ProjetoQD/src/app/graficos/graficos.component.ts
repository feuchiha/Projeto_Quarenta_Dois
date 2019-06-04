import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UpgradableComponent } from 'theme/components/upgradable';
import { BlankLayoutCardComponent } from 'app/components/blank-layout-card';
import { QdSelectComponent } from 'app/components/qd-select/qd-select.component';


@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit {

  constructor(private http: HttpClient, public toastr: ToastrManager) {
  }

  ngOnInit() {
 
  
  }

}
