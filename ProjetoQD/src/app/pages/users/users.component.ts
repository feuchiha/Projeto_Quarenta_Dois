import { Component, OnInit } from '@angular/core';
import { BlankLayoutCardComponent } from 'app/components/blank-layout-card';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent extends BlankLayoutCardComponent implements OnInit {

  constructor(private http: HttpClient) {
    super();
  }

  ngOnInit() {
      const headers = new HttpHeaders()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');
      this.http.post(`http://localhost:3002/users/listusers`,
      JSON.stringify(JSON.parse(localStorage.getItem('usr'))), {
      headers: headers
      })
      .subscribe(data => {
         if(data['success'] === true){
          console.log(data['message']);
          console.log(data['data']);
        } else{
           alert(data['message']);
         }
      });
  }

}
