import { Component, OnInit, ViewChild } from '@angular/core';

import {BlankLayoutCardComponent} from 'app/components/blank-layout-card';
import { QdSelectComponent } from 'app/components/qd-select/qd-select.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';




@Component({
  selector: 'app-importacao',
  templateUrl: './importacao.component.html',
  styleUrls: ['/importacao.component.css']
})
export class ImportacaoComponent extends BlankLayoutCardComponent implements OnInit{

  token:  {email:"",name:"", perfil: any, token:""};

  constructor(private http: HttpClient, public toastr: ToastrManager) {
    super();
    this.token = JSON.parse(localStorage.getItem('usr'));
  }

  ngOnInit(){
    if(this.token != null){
      const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
      this.http.post(`http://localhost:3002/login/verifytoken`, 
      JSON.stringify(this.token), {
      headers: headers
      })
      .subscribe(data => {
        console.log(data);
        if(data['success'] === false){
          window.location.href = 'http://localhost:4200/#/app/visualizacao-dados'
      }else{
        this.display();
      }
    })
  }else{
    window.location.href = 'http://localhost:4200/#/app/visualizacao-dados'
  }
}

  selected: string;

  arrSelect: string[];
  display() {
    this.arrSelect=['7 dias','15 dias','30 dias', '90 dias'];
    document.getElementById('ButtonImportURL')['addEventListener']("click", function() {
      document.querySelector('.bg-modal')['style']['display'] = "flex";
    });

    document.querySelector('.close').addEventListener("click", function() {
      document.querySelector('.bg-modal')['style']['display'] = "none";
    });
  }

  onSelect(val: string){
    this.selected = val;
  }
}