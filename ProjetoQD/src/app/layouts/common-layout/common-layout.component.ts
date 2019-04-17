import { Component } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
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
  local:  {email:"",name:"", status:""};

  constructor(public toastr: ToastrManager) {
    console.log(localStorage.getItem('usr'))
    this.local = JSON.parse(localStorage.getItem('usr'));

  }

  logout(){
    localStorage.removeItem('usr');
    window.location.href = '../pages/pages/LoginComponent';
  }

  logar(){
    this.toastr.errorToastr('POR FAVOR. LOGE-se.', 'Oops!');
  }

}