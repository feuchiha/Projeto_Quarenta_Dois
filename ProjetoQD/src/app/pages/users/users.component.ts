import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';

import * as $ from 'jquery';


export interface PeriodicElement {
  id: string;
  user: string;
  created: string;
  email: string;
  status:string;
  perfil: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css' ]
})

export class UsersComponent implements OnInit {
 
  userSet:string;
  displayedColumns: string[]  = ['user', 'status', 'created', 'email', 'senha', 'perfil', 'check'];
  dataSource: any
  perfilUsuario : string[] = ['Admin', 'User', 'Inativo'];
  selected: string;
  user =  {newpassword:"", confirmepassword:"",id: ""};
  usr = {id:"", perfil:""};
  id = {idUser:""};
  token:  {email:"",name:"", perfil: any, token:""};

  constructor(private http: HttpClient, public toastr: ToastrManager) {
    this.token = JSON.parse(localStorage.getItem('usr'));
  }
  
  ngOnInit(){
    if(this.token != null && this.token.perfil != 'User'){
      const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
      this.http.post(`http://localhost:3002/login/verifytoken`, 
      JSON.stringify(this.token), {
      headers: headers
      })
      .subscribe(data => {
        console.log(data);
        if(data['success'] === true){
          this.loadUsers();
        }else{
          window.location.href = 'http://localhost:4200/#/app/visualizacao-dados'
      }
    })
    }else{
      window.location.href = 'http://localhost:4200/#/app/visualizacao-dados'
    }
  }


  loadUsers() {
    const ELEMENT_DATA: PeriodicElement[] = [];

    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
    this.http.post(`http://localhost:3002/users/listusers`,{
    headers: headers
    })
    .subscribe(data => {
      for(let obj in data['data']){
        ELEMENT_DATA.push({
          id: data['data'][obj]['_id'],
          user: data['data'][obj]['name'],
          created: data['data'][obj]['created'],
          email: data['data'][obj]['email'],
          status:data['data'][obj]['status'],
          perfil:data['data'][obj]['perfil']
        })
      }
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);    
    });
    
    // document.getElementById('alteraSenhaAdmin')['addEventListener']("click", function() {
    //   document.querySelector('.bg-modal')['style']['display'] = "flex";
    // });

    $('alteraSenhaAdmin').on('click', function(){
      
    });
    document.querySelector('.close').addEventListener("click", function() {
      document.querySelector('.bg-modal')['style']['display'] = "none";
    });

  }

  setFlexModal(){
    document.querySelector('.bg-modal')['style']['display'] = "flex";
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  salvaId(id, nameUser: string){
    this.setFlexModal();
    this.userSet = nameUser;
    this.id = {
      idUser: id,
  }
}


  updateUser(id){
    this.usr = {
      id: id,
      perfil: this.selected,
    }
 
    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
    this.http.post(`http://localhost:3002/users/updateADM/`,
    JSON.stringify(this.usr), {
    headers: headers
    })
    .subscribe(data => {
       if(data['success'] === false){ 
        this.toastr.errorToastr(data['message'], 'Oops!');
      }else{
        this.toastr.successToastr(data['message'], 'Success!');
        setTimeout(function(){ 
          window.location.reload();
          }, 500);
      }
      
    });
    
  }
  
  onSelect(val: string){
    this.selected = val;
  }

  Updatepw(port){

    this.user = {
      id: this.id.idUser,
      newpassword: this.user.newpassword,
      confirmepassword: this.user.confirmepassword
    }

    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');
this.http.post(`http://localhost:${port}/users/updateADMPW`, 
JSON.stringify(this.user), {
headers: headers
})
.subscribe(data => {
 if(data['success'] === false){ 
  this.toastr.errorToastr(data['message'], 'Oops!');
}else{
  document.querySelector('.bg-modal')['style']['display'] = "none";
  this.toastr.successToastr(data['message'], 'Success!');
}

});

  }
}

