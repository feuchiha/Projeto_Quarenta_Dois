import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})

export class CardComponent implements OnInit {

  constructor(private http: HttpClient, public toastr: ToastrManager) {
  }

  ngOnInit() {
    console.log('teste');
    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json')
    this.http.post(`http://localhost:3002/Mysql/clientes`,{
    headers: headers
    })
    .subscribe(data => {
      console.log(data);
  })
}

}
