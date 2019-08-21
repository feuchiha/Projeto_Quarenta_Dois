import { Component, OnInit } from '@angular/core';
import { BlankLayoutCardComponent } from 'app/components/blank-layout-card';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent extends BlankLayoutCardComponent {

  user = {email:"", username:"", password:"", confirmepw:""};
   
  constructor(private http: HttpClient, public toastr: ToastrManager) {
    super();
  }

  findUser(port) {
    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
    this.http.post(`http://localhost:${port}/users/findEmail`, 
    JSON.stringify(this.user), {
    headers: headers
    })
    .subscribe(data => {
       if(data['success'] === false){
        if(this.user.username == "" || this.user.username == undefined ){

          this.toastr.errorToastr("Informe seu nome para efetuar a alteração do cadastro", 'Oops!');
        
        }else if (this.user.email.indexOf("@") == -1 ||
          this.user.email.indexOf(".") == -1 ||
          this.user.email.indexOf("@") == 0 ||
          this.user.email.lastIndexOf(".") + 1 == this.user.email.length ||
          (this.user.email.indexOf("@") + 1 == this.user.email.indexOf("."))) { 
         
            this.toastr.errorToastr('Informe um e-mail válido', 'Oops!');
          
            }else{
              //this.toastr.successToastr(data['message'], 'Success!');
              this.signup(port); 
            }
      } else{

        this.toastr.errorToastr(data['message'], 'Oops!');
       }
    });
  }

signup(port) {
  const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
  this.http.post(`http://localhost:${port}/users/signup`, 
  JSON.stringify(this.user), {
  headers: headers
  })
  .subscribe(data => {
     if(data['success'] === false){
      this.toastr.errorToastr(data['message'], 'Oops!');
    }else{
      this.toastr.successToastr(data['message'], 'Success!');
     }setTimeout(function(){ 
      window.location.href = 'http://localhost:4200/#/pages/login'
    }, 500);
     
  });
}
}


