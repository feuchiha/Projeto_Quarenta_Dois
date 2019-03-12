import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThemeModule } from 'theme';

import { DashboardComponent } from './dashboard.component';
import { LineChartComponent } from './line-chart';
import { PieChartComponent } from './pie-chart';

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
    // CotoneasterCardComponent,

  ],
})
export class DashboardModule { }
