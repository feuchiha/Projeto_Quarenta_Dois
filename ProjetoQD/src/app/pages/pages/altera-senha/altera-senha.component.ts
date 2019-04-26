import { Component, HostBinding, NgModule, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BlankLayoutCardComponent } from 'app/components/blank-layout-card';

@Component({
  selector: 'app-altera-senha',
  templateUrl: './altera-senha.component.html',
  styleUrls: ['../../../components/blank-layout-card/blank-layout-card.component.scss']
})

export class AlteraSenhaComponent extends BlankLayoutCardComponent {
  back = {user:{password:""}, params: {token:""}};
   
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, public toastr: ToastrManager) {
    super();
  }
    
    forgot(port) {
      this.activatedRoute.queryParams.subscribe((params: Params) => {
      const headers = new HttpHeaders()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');
      this.http.post(`http://localhost:${port}/forgot/reset/` + params.token, 
      JSON.stringify(this.back.user), {
      headers: headers
      })
      .subscribe(data => {
         if(data['success'] === true){
          this.toastr.successToastr(data['message'], 'Success!');
         }
      });
    });
    }
  }
