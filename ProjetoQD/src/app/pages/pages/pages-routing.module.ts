import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login';
import { LayoutsModule } from 'app/layouts';
import { BlankLayoutComponent } from 'app/layouts/blank-layout';
import { ErrorComponent } from './error';
import { ForgotPasswordComponent } from './forgot-password';
import { CadastroComponent } from './cadastro';
import { AlteraSenhaComponent } from './altera-senha/altera-senha.component';



@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: BlankLayoutComponent,
        children: [
          { path: '404', component: ErrorComponent, pathMatch: 'full' },
          { path: 'forgot-password', component: ForgotPasswordComponent, pathMatch: 'full' },
          { path: 'login', component: LoginComponent, pathMatch: 'full' },
          { path: 'cadastro', component: CadastroComponent, pathMatch:'full'},
          { path: 'altera-senha', component: AlteraSenhaComponent, pathMatch: 'full'},
          { path: '**', redirectTo: '404' },
        ],
      },
    ]),
    LayoutsModule,
  ],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
