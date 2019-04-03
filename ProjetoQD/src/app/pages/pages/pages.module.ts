import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThemeModule } from 'theme';

import { ErrorComponent } from './error';
import { ForgotPasswordComponent } from './forgot-password';
import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
// import { LoginParticleComponent } from './login-particle/login-particle.component';




@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    PagesRoutingModule,
  ],
  declarations: [
    ErrorComponent,
    ForgotPasswordComponent,
    LoginComponent,
    CadastroComponent
    // LoginParticleComponent
  ],
})
export class PagesModule { }