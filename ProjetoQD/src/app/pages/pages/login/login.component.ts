import { Component} from '@angular/core';

import { BlankLayoutCardComponent } from 'app/components/blank-layout-card';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  styleUrls: ['../../../components/blank-layout-card/blank-layout-card.component.scss'],
  templateUrl: './login.component.html',
})

export class LoginComponent extends BlankLayoutCardComponent { 
    user = {email:"", password:""};
    email: String;
    usr: {email:"",username:""};
    
    constructor(private http: HttpClient) {
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
         let token = data['token'];  
          this.email = data['email'];
         this.verifytoken(token, this.email);
         }
      });
    }

    verifytoken(token, email){
      const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
      this.http.post(`http://localhost:3002/login/verifytoken`, 
      JSON.stringify({token}), {
      headers: headers
      })
      .subscribe(data => {
        if(data['success'] === true){
          this.callMe(this.email);
        }setTimeout(
          function(){ 
          window.location.href = 'http://localhost:4200/#/app/dashboard'
          }, 500);
      });
  }

  callMe(email){
    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
    this.http.post(`http://localhost:3002/users/findEmail`, 
    JSON.stringify({email}), {
    headers: headers
    })
    .subscribe(data => {
       if(data['success'] === true){
        this.usr = {
          email: data['email'],

          username: data['name']
        }
        localStorage.setItem('usr', JSON.stringify(this.usr));
      } else{
         alert(data['message']);
       }
    });
  }
}

