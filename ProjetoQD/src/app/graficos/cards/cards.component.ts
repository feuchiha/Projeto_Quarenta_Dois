import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  perfilUsuario: string[] = ['Admin', 'User', 'Inativo'];
  selected: string;
  
  constructor(private http: HttpClient, public toastr: ToastrManager) {
  }

  onSelect(val: string) {
    this.selected = val;
  }

  ngOnInit() {
  }
    /*
    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');
    this.http.post(`http://localhost:3002/index/bases`, 
     {
    headers: headers
    })
    .subscribe(data => {
      //if(data['success'] === true){
        //this.toastr.errorToastr(data['message'], 'Oops!');
      //}
      console.log(data);
  })
  
}
*/

}
