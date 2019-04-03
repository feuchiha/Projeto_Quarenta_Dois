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
  import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
  import {ReactiveFormsModule} from '@angular/forms';
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

@NgModule({
  declarations: [AppComponent, ImportacaoComponent, LogsComponent, VisualizacaoDadosComponent, AboutComponent ],
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
    MatNativeDateModule
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
