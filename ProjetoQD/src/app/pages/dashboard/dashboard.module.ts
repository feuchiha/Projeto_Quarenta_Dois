import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThemeModule } from 'theme';

import { DashboardComponent } from './dashboard.component';
import { LineChartComponent } from './line-chart';
import { PieChartComponent } from './pie-chart';
import { CardComponent } from './card/card.component';
import { CardgeoComponent } from './cardgeo/cardgeo.component';
import { CardlineComponent } from './cardline/cardline.component';
import { CardcolumnComponent } from './cardcolumn/cardcolumn.component';
import { CardpieComponent } from './cardpie/cardpie.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    FormsModule,
  ],
  declarations: [
    DashboardComponent,
    LineChartComponent,
    PieChartComponent,
    CardComponent,
    CardgeoComponent,
    CardlineComponent,
    CardcolumnComponent,
    CardpieComponent,
    // CotoneasterCardComponent,

  ],
})
export class DashboardModule { }
