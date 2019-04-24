
import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';

export interface PeriodicElement {
  user: string;
  created: string;
  email: string;
  status:string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css' ]
})

export class UsersComponent implements OnInit {
  
  displayedColumns: string[]  = ['user', 'status', 'created', 'email', 'senha', 'aa'];
  dataSource: any
  constructor(private http: HttpClient, public toastr: ToastrManager) {
  }

  ngOnInit() {
    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
    this.http.post(`http://localhost:3002/users/listusers`,{
    headers: headers
    })
    .subscribe(data => {
      for(let obj in data['data']){
        ELEMENT_DATA.push({
          user: data['data'][obj]['name'],
          created: data['data'][obj]['created'],
          email: data['data'][obj]['email'],
          status:data['data'][obj]['status']
        })
      }
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);      
    });
    
  }

 
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}