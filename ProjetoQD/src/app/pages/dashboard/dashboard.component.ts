import { Component, HostBinding, OnInit } from '@angular/core';

import { UpgradableComponent } from 'theme/components/upgradable';
import { BlankLayoutCardComponent } from 'app/components/blank-layout-card';
import { QdSelectComponent } from 'app/components/qd-select/qd-select.component';



@Component({
  selector: 'app-dashboard',
  styleUrls: ['dashboard.component.css'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent extends BlankLayoutCardComponent implements OnInit{

  selected: string;

arrSelect: string[];
ngOnInit() {
  this.arrSelect=['7 dias','15 dias','30 dias', '90 dias'];
}
  @HostBinding('class.mdl-grid') private readonly mdlGrid = true;
  @HostBinding('class.mdl-grid--no-spacing') private readonly mdlGridNoSpacing = true;
  
  onSelect(val: string){
    this.selected = val;
  }
}

