import { Component, Input } from '@angular/core';

import { SidebarComponent as BaseSidebarComponent } from 'theme/components/sidebar';

@Component({
  selector: 'app-sidebar',
  styleUrls: ['../../../theme/components/sidebar/sidebar.component.scss'],
  templateUrl: '../../../theme/components/sidebar/sidebar.component.html',
})
export class SidebarComponent extends BaseSidebarComponent {
  public title = '42';
  public menu = [
    { name: 'Início', link: '/app/dashboard', icon: 'home' },
    { name: 'Importar', link: '/app/importacao', icon: 'backup' },
    { name: 'Histórico', link: '/app/Logs', icon: 'history' },
    { name: 'Análises', link: '/app/Analises', icon: 'broken_image' },
    { name: 'Minha conta', link: '/app/forms', icon: 'person'},
    { name: 'Sobre', link: '/app/Logs', icon: 'casino' },
    { name: 'Pages', children: [
      { name: '404', link: '/pages/error' },
      { name: 'Esqueceu a senha', link: '/pages/forgot-password' },
      { name: 'Login', link: '/pages/login'},
      { name: 'Cadastro', link: '/pages/cadastro'},
      { name: 'Login Particula', link: '/pages/login-particle'},

    ], icon: 'pages' },
  ];
}
