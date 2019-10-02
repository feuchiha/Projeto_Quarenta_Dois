import { Component, Input, OnInit } from '@angular/core';
import { SidebarComponent as BaseSidebarComponent } from 'theme/components/sidebar';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  styleUrls: ['../../../theme/components/sidebar/sidebar.component.scss'],
  templateUrl: '../../../theme/components/sidebar/sidebar.component.html',
})

export class SidebarComponent extends BaseSidebarComponent implements OnInit {

  token: {email: any ,name:"", perfil: any , token:""};
  user = {id:"", email:"", username:"", password:"", newpassword:"", confirmenewpw:"", token:"", emailnew:""};

  constructor(public http: HttpClient, public toastr: ToastrManager) {
    super();
    this.token = JSON.parse(localStorage.getItem('usr'));
}

  public title = '42';
  public menu = [];

  ngOnInit(){
        if(this.token.perfil != "User" ){
            this.menu =  [
              { name: 'Início', link: '/app/dashboard', icon: 'home' },
              { name: 'Gráficos', link: '/app/graficos', icon: 'insert_chart'},
              { name: 'Precisoes', link: '/app/previsoes', icon: 'insert_chart' },
              //{ name: 'Importar', link: '/app/importacao', icon: 'backup' },
              //{ name: 'Histórico', link: '/app/logs', icon: 'history' },
              //{ name: 'Análises', link: '/app/visualizacao-dados', icon: 'broken_image' },
              { name: 'Minha conta', link: '/app/forms', icon: 'person'},
              { name: 'Usuarios', link: '/app/users', icon: 'assignment_ind'},
              { name: 'Sobre', link: '/app/about', icon: 'casino' },
              /*{ name: 'Pages', children: [
                { name: '404', link: '/pages/error' },
                { name: 'Esqueceu a senha', link: '/pages/forgot-password' },
                { name: 'Login', link: '/pages/login'},
                { name: 'Cadastro', link: '/pages/cadastro'},
                { name: 'Altera Senha', link: '/pages/altera-senha'},
          
          
              ], icon: 'pages' },*/
            ];
      }else{
        
      this.menu =  [
        { name: 'Inicio', link: '/app/graficos', icon: 'home'},
        { name: 'Gráficos', link: '/app/graficos', icon: 'insert_chart'},
        { name: 'Precisoes', link: '/app/previsoes', icon: 'insert_chart' },
        // { name: 'Início', link: '/app/dashboard', icon: 'home' },
        //{ name: 'Importar', link: '/app/importacao', icon: 'backup' },
        //{ name: 'Histórico', link: '/app/logs', icon: 'history' },
       // { name: 'Análises', link: '/app/visualizacao-dados', icon: 'broken_image' },
        { name: 'Minha conta', link: '/app/forms', icon: 'person'},
        { name: 'Sobre', link: '/app/about', icon: 'casino' },
        /*{ name: 'Pages', children: [
          { name: '404', link: '/pages/error' },
          { name: 'Esqueceu a senha', link: '/pages/forgot-password' },
          { name: 'Login', link: '/pages/login'},
          { name: 'Cadastro', link: '/pages/cadastro'},
          { name: 'Altera Senha', link: '/pages/altera-senha'},
    
    
        ], icon: 'pages' },*/
      ];
    }
  }

  loadSession(){
    if(this.token != null){
      const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
      this.http.post(`http://localhost:3002/login/verifytoken`, 
      JSON.stringify(this.token), {
      headers: headers
      })
      .subscribe(data => {
        if(data['success'] === true){
          return true;
  
        }else{
          window.location.href = 'http://localhost:4200'
      }
        })
          return true;
        }else{
          window.location.href = 'http://localhost:4200'
        }
  }
}
