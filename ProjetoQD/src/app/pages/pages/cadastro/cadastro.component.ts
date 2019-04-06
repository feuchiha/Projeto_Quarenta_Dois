import { Component, OnInit } from '@angular/core';
import { BlankLayoutCardComponent } from 'app/components/blank-layout-card';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent extends BlankLayoutCardComponent {

  user = {email:"", username:"", password:"", confirmepw:""};
   
  constructor(private http: HttpClient) {
    super();
  }
  
  findUser(port) {
    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
    this.http.post(`http://localhost:${port}/users/findUser`, 
    JSON.stringify(this.user), {
    headers: headers
    })
    .subscribe(data => {
       if(data['success'] === true){
        console.log(data['message']);
        this.signup(port);
      } else{
         alert(data['message']);
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
     if(data['success'] === true){
      console.log(data['message']);
      alert('Usuario Cadastrado com sucesso!');
     }else{
      console.log(data['message']); 
     }
  });
}
}


