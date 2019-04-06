import { Component, HostBinding, NgModule } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-employer-form',
  styleUrls: ['./employer-form.component.css'],
  templateUrl: 'employer-form.component.html',
})
  
export class EmployerFormComponent  {

    user = {email:"", username:"", password:""};
   
    constructor(private http: HttpClient) {
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
        console.log(data);
        alert('Usuario Cadastrado com sucesso!');
       }
    });
  }
}