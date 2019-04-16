import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginComponent } from 'app/pages/pages/login';

export interface User{
   email:String, 
   name:String,
   Status:String,
}

@Component({

  selector: 'app-common-layout',
  templateUrl: './common-layout.component.html',
  styleUrls: ['./common-layout.component.css'],
})
export class CommonLayoutComponent {
  user:  {email:"",name:"", status:""};

  constructor() {
    this.user = JSON.parse(localStorage.getItem('usr'));

  }

  logout(){
    localStorage.removeItem('usr');
    window.location.href = '../pages/pages/LoginComponent';
  }

  logar(){
    alert(prompt('POR FAVOR. LOGE-se'));
  }

}