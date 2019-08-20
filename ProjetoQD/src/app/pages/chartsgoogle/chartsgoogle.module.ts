import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  declarations: [
    GoogleChartsModule,
  ],
  imports: [
    CommonModule,
    GoogleChartsModule.forRoot(),
  ]
})
export class ChartsgoogleModule { }
