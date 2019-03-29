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
         this.verifytoken(token);
         }
      });
    }

    verifytoken(token){
      const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
      this.http.post(`http://localhost:3002/login/verifytoken`, 
      JSON.stringify({token}), {
      headers: headers
      })
      .subscribe(data => {
        if(data['success'] === true){
          alert('logged');
          //window.location.href = '../../dashboard/dashboard.component.html'
        }
      });

  }
}