import { Component, OnInit } from '@angular/core';
import { BlankLayoutCardComponent } from 'app/components/blank-layout-card';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent extends BlankLayoutCardComponent {

  user = {email:"", username:"", password:"", confirmepw:""};
   
  constructor(private http: HttpClient, public toastr: ToastrManager) {
    super();
  }
  
  findUser(port) {
    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
    this.http.post(`http://localhost:${port}/users/findUser`, 
    JSON.stringify(this.user), {
    headers: headers
    })
    .subscribe(data => {
       if(data['success'] === true){
        this.toastr.successToastr(data['message'], 'Success!');
        this.signup(port);
      } else{
        this.toastr.errorToastr(data['message'], 'Oops!');
       }
    });
  }

signup(port) {
  const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
  this.http.post(`http://localhost:${port}/users/signup`, 
  JSON.stringify(this.user), {
  headers: headers
  })
  .subscribe(data => {
     if(data['success'] === true){
      this.toastr.successToastr(data['message'], 'Success!');
     }else{
      this.toastr.errorToastr(data['message'], 'Oops!'); 
     }
  });
}
}


