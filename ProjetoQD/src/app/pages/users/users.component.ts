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
  
  displayedColumns: string[]  = ['user', 'status', 'created', 'email', 'senha', 'perfil'];
  usr = {id:"", perfil:""};
  dataSource: any
  perfilUsuario : string[] = ['Admin', 'User', 'Inativo'];
  selected: string;
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
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateUser(id, perfil){
    
    this.usr = {
      id: id,
      perfil: perfil,
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
      }
      
    });
    
  }
  
  onSelect(val: string){
    this.selected = val;
  }
}

