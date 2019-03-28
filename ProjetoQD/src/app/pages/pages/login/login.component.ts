import { Component, HostBinding, NgModule } from '@angular/core';

import { BlankLayoutCardComponent } from 'app/components/blank-layout-card';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  styleUrls: ['../../../components/blank-layout-card/blank-layout-card.component.scss'],
  // styleUrls: ['../../../components/login.css'],
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
            .set('Content-Type', 'application/json');
      // ports:
      // :3000 - to call nodejs server
      // :3001 - to call aspnet core server
      this.http.post(`http://localhost:${port}/login/login`, 
      JSON.stringify(this.user), {
      headers: headers
      })
      .subscribe(data => {
         if(data['success'] === true){
          alert(data['token']);
          //window.location.href = '../../dashboard/dashboard.component.html'
         }
      });
    }
  }