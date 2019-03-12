import { Component } from '@angular/core';

@Component({
  selector: 'app-common-layout',
  templateUrl: './common-layout.component.html',
})
export class CommonLayoutComponent {
  usr: {};

  constructor(){
    this.usr = {
      email:'luke@gmail.com',
      image:'assets/images/Icon_header.png',
      name:'Luke'
    }
  }
 }
