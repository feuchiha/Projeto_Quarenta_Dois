import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutsModule } from './layouts';
import { CommonLayoutComponent } from './layouts/common-layout';
import { DashboardComponent } from './pages/dashboard';
import { FormsComponent } from './pages/forms';
import { ImportacaoComponent} from './pages/importacao';

import { AboutComponent } from './pages/about';

import { LogsComponent } from './pages/logs/logs.component';
import { VisualizacaoDadosComponent } from './pages/visualizacao-dados/visualizacao-dados.component';
import { UsersComponent } from './pages/users';
import { User2testeComponent } from './pages/user2teste/user2teste.component';
import { ChartsgoogleComponent } from './pages/chartsgoogle/chartsgoogle.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        { path: '', redirectTo: 'app/visualizacao-dados', pathMatch: 'full' },
        { path: 'app', component: CommonLayoutComponent, children: [
          { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
          { path: 'forms', component: FormsComponent, pathMatch: 'full' },
          { path: 'importacao', component: ImportacaoComponent, pathMatch: 'full' },
          { path: 'users', component: UsersComponent, pathMatch: 'full' },
          { path: 'user2teste', component: User2testeComponent, pathMatch: 'full' },
          { path: 'about', component: AboutComponent, pathMatch: 'full'},
          { path: 'logs', component:LogsComponent, pathMatch:'full'},
          { path: 'pie-chart', component: PieChartComponent, pathMatch: 'full'},
          { path: 'visualizacao-dados', component:VisualizacaoDadosComponent, pathMatch:'full'},
          { path: '**', redirectTo: '/pages/404' },
        ] },
        { path: 'pages', loadChildren: './pages/pages/pages.module#PagesModule' },
        { path: '**', redirectTo: '/pages/404' },
      ],
      { useHash: true },
    ),
    LayoutsModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
