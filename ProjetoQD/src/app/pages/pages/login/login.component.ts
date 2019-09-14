import { Component} from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { BlankLayoutCardComponent } from 'app/components/blank-layout-card';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  styleUrls: ['../../../components/blank-layout-card/blank-layout-card.component.scss'],
  templateUrl: './login.component.html',
})

export class LoginComponent extends  BlankLayoutCardComponent { 

    user = {email:"", password:""};
    usr: {email:"",username:"", status:"", perfil:"",token:""};

    constructor(public http: HttpClient, public toastr: ToastrManager) {
      super();
    }
        
    callServer(port) {
      const headers = new HttpHeaders()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json')
      this.http.post(`http://localhost:${port}/login/login`, 
      JSON.stringify(this.user), {
      headers: headers
      })
      .subscribe(data => {
         if(data['success'] === true){
        this.usr = {
          token: data['token'],
          username: data['name'],
          email: data['email'],
          perfil: data['perfil'],
          status: data['status']
        }
        localStorage.setItem('usr', JSON.stringify(this.usr));
         if(data['status'] != "Inativo"){
          this.verifytoken()
         }else{
          this.toastr.errorToastr('Perdão, mas o seu usuário esta Inativo ou foi Bloqueado. Contate um administrador!', 'Oops!');
         }        
         }else{
          this.toastr.errorToastr(data['message'], 'Oops!');
         }
      });
    }

    verifytoken(){
      const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
      this.http.post(`http://localhost:3002/login/verifytoken`, 
      JSON.stringify(this.usr), {
      headers: headers
      })
      .subscribe(data => {
        if(data['success'] === false){
          this.toastr.errorToastr(data['message'], 'Oops!');
        }else{
        }setTimeout(
          function(){ 
          window.location.href = 'http://localhost:4200/#/app/graficos'
          }, 500);
      });
  }
}

