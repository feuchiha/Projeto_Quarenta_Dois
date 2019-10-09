import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './pages/dashboard';
import { ImportacaoComponent } from './pages/importacao/importacao.component';
import { HttpClientModule } from '@angular/common/http';
import { LogsComponent } from './pages/logs/logs.component';
import { FormsModule } from './pages/forms'
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ng6-toastr-notifications';
import { GoogleChartsModule } from 'angular-google-charts';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
  } from '@angular/material';
  import {CdkTableModule} from '@angular/cdk/table';
import { VisualizacaoDadosComponent } from './pages/visualizacao-dados/visualizacao-dados.component';

import { AboutComponent } from './pages/about/about.component';
import { UsersComponent } from './pages/users/users.component';
import { QdSelectComponent } from './components/qd-select/qd-select.component';
import { QdFiltroComponent } from './components/qd-filtro/qd-filtro.component';
import { User2testeComponent } from './pages/user2teste/user2teste.component';
import { ChartsgoogleComponent } from './pages/chartsgoogle/chartsgoogle.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { GraficosComponent } from './graficos/graficos.component';
import { CardsComponent } from './graficos/cards/cards.component';
import { GeoComponent } from './graficos/geo/geo.component';
import { LineComponent } from './graficos/line/line.component';
import { LinePredictComponent } from './graficos/linePredict/linePredict.component';
import { LinePredictPreviComponent } from './graficos/linePredictPrevi/linePredictPrevi.component';
import { ColumnComponent } from './graficos/column/column.component';
import { ColumnPredictComponent } from './graficos/columnPredict/columnPredict.component';
import { AreaComponent } from './graficos/area/area.component'; 
import { PieComponent } from './graficos/pie/pie.component';
import { PrevisoesComponent } from './pages/previsoes/previsoes.component';
import { TesteFiltroComponent } from './graficos/teste-filtro/teste-filtro.component';
import { ColumnPreviComponent } from './graficos/columnprevi/columnprevi.component';

@NgModule({

  declarations: [AppComponent, ImportacaoComponent, LogsComponent, VisualizacaoDadosComponent, AboutComponent, UsersComponent, QdSelectComponent, User2testeComponent, ChartsgoogleComponent, PieChartComponent, GraficosComponent, CardsComponent, GeoComponent, LineComponent, LinePredictComponent, LinePredictPreviComponent, ColumnComponent, ColumnPredictComponent, AreaComponent, PieComponent, PrevisoesComponent, TesteFiltroComponent, ColumnPreviComponent ],


  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    BrowserAnimationsModule,  
    ReactiveFormsModule,
    MatCardModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
    GoogleChartsModule.forRoot(),
  ],
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    LogsComponent
  ],
})
export class AppModule { }
