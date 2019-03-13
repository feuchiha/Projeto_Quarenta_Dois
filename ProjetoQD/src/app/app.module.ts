import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './pages/dashboard';
import { FormsModule } from './pages/forms';
import { TelaLoginParticulaComponent } from './components/tela-login-particula/tela-login-particula.component';
import { ImportacaoComponent } from './pages/importacao/importacao.component';


@NgModule({
  declarations: [AppComponent, TelaLoginParticulaComponent, ImportacaoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
