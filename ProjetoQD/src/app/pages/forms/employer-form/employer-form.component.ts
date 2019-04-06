import { Component, HostBinding, NgModule, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-employer-form',
  styleUrls: ['./employer-form.component.css'],
  templateUrl: 'employer-form.component.html',
})
  
export class EmployerFormComponent {

    user = {email:"", username:"", password:"", newpassword:"", confirmenewpw:""};
    usr = {_id:"", username:"", password:"", newpassword:"", confirmenewpw:"", email:""};

    constructor(private http: HttpClient) {
      this.user = JSON.parse(localStorage.getItem('usr'));
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
         if(data['success'] === true){
          this.usr = {
            _id: data['id'],
            username: this.user.username,
            email: this.user.email,
            password: this.user.password,
            newpassword: this.user.newpassword,
            confirmenewpw: this.user.confirmenewpw,
          }
          this.updateUser(port)
        } else{
           alert(data['message']);
         }
      });
    }

   
  updateUser(port) {
    console.log(this.usr);
    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
    this.http.post(`http://localhost:${port}/users/updateUser/`,
    JSON.stringify(this.usr), {
    headers: headers
    })
    .subscribe(data => {
       if(data['success'] === true){
        localStorage.setItem('usr', JSON.stringify(this.usr.username));
        localStorage.setItem('usr', JSON.stringify(this.usr.email));
        alert('Usuario Alterado com sucesso!');
       }setTimeout(
        function(){ 
        window.location.reload();
        }, 500);
    });
  }
}