import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThemeModule } from 'theme';

import { ErrorComponent } from './error';
import { ForgotPasswordComponent } from './forgot-password';
import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';




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

  ],
})
export class PagesModule { }