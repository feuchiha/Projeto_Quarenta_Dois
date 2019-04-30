import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';

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
  
  displayedColumns: string[]  = ['user', 'status', 'created', 'email', 'senha', 'perfil', 'check'];
  dataSource: any
  perfilUsuario : string[] = ['Admin', 'User', 'Inativo'];
  selected: string;
  user =  {newpassword:"", confirmepassword:"",id:""};
  usr = {id:"", perfil:""};
  id = {id:""};

  constructor(private http: HttpClient, public toastr: ToastrManager) {
   
  }

  ngOnInit() {
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

    document.getElementById('alteraSenhaAdmin')['addEventListener']("click", function() {
      document.querySelector('.bg-modal')['style']['display'] = "flex";
    });

    document.querySelector('.close').addEventListener("click", function() {
      document.querySelector('.bg-modal')['style']['display'] = "none";
    });

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  salvaId(id){
      this.id = id;
  }


  updateUser(id){
    
    if (this.selected == null || this.selected == undefined){
      this.selected = JSON.parse(localStorage.getItem('usr')).perfil;
    }

    console.log(this.selected);

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
      id: this.id.id,
      newpassword: this.user.newpassword,
      confirmepassword: this.user.confirmepassword
    }

    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');
this.http.post(`http://localhost:${port}/users/findUser`, 
JSON.stringify(this.usr), {
headers: headers
})
.subscribe(data => {
 if(data['success'] === false){ 
  this.toastr.errorToastr(data['message'], 'Oops!');
}else{
  this.toastr.successToastr(data['message'], 'Success!');
}

});

  }
}

