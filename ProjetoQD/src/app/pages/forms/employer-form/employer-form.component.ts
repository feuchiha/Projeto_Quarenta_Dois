import { Component, HostBinding, NgModule } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-employer-form',
  styleUrls: ['./employer-form.component.scss'],
  templateUrl: 'employer-form.component.html',
})
  
export class EmployerFormComponent  {
  back = {user:{password:""}, params: {token:""}};
   
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {
  }
    
    signup(port) {
      this.activatedRoute.queryParams.subscribe((params: Params) => {
      const headers = new HttpHeaders()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');
      // ports:
      // :3000 - to call nodejs server
      // :3001 - to call aspnet core server
      this.http.post(`http://localhost:${port}/forgot/reset/` + params.token, 
      JSON.stringify(this.back.user), {
      headers: headers
      })
      .subscribe(data => {
         //if(data['success'] === true){
          
          console.log(data);
          //window.location.href = '../../dashboard/dashboard.component.html'
         //}
      });
    });
    }
  }