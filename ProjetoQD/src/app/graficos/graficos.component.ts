import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UpgradableComponent } from 'theme/components/upgradable';
import { BlankLayoutCardComponent } from 'app/components/blank-layout-card';
import { QdSelectComponent } from 'app/components/qd-select/qd-select.component';
import { SidebarComponent } from 'theme/components/sidebar';


import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThemeModule } from 'theme';


@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent extends BlankLayoutCardComponent implements OnInit {

  ngOnInit(){
   
    }

}