import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { keys } from 'd3';

export interface PeriodicElement {
  user: string;
  created: string;
  email: string;
  status:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {user: 'Haruno', created: '2019/04/07', email: 'sakura@haruno.com', status:"INATIVO"},
  {user: 'Uchiha', created: '2019/04/07', email: 'sasuke@uchiha.com', status:"User"},
  {user: 'Uzumaki', created: '2019/04/07', email: 'naruto@uzumaki.com', status:"Admin"}
];
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css' ]
})
export class UsersComponent  {
  displayedColumns: string[]  = ['user', 'created', 'email','aa'];
 
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}