import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface User{
   email:String, 
   name:String,
   image:String
}

@Component({

  selector: 'app-common-layout',
  templateUrl: './common-layout.component.html',
  styleUrls: ['./common-layout.component.css'],
})
export class CommonLayoutComponent {
  user:  {email:"",name:"",image: any};

  constructor() {
    this.user = JSON.parse(localStorage.getItem('usr'));
    console.log(this.user)
  }
}