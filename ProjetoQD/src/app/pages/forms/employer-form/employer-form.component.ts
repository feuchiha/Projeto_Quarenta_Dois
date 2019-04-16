import { Component, HostBinding, NgModule, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-employer-form',
  styleUrls: ['./employer-form.component.css'],
  templateUrl: 'employer-form.component.html',
})
  
export class EmployerFormComponent {

    user = {email:"", username:"", password:"", newpassword:"", confirmenewpw:""};
    usr = {_id:"", username:"", password:"", newpassword:"", confirmenewpw:"", email:""};
    local = {id:"", email:"", username:""};

    constructor(private http: HttpClient, public toastr: ToastrManager) {
      this.user = JSON.parse(localStorage.getItem('usr'));
    }

    findUser(port) {
     this.usr = {_id:undefined, username:undefined, password:undefined, newpassword:undefined, confirmenewpw:undefined, email:undefined};
     this.local = JSON.parse(localStorage.getItem('usr'));
      const headers = new HttpHeaders()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');
      this.http.post(`http://localhost:${port}/users/findEmail`,
      JSON.stringify(this.local), {
      headers: headers
      })
      .subscribe(data => {
         if(data['success'] === true){
          this.usr = {
            _id: data['id'],
            username: this.user.username,
            email: this.user.email,
            password: this.user.password,
            newpassword: this.user.newpassword,
            confirmenewpw: this.user.confirmenewpw,
          }
          this.updateUser(port)
          this.user = {email:undefined, username:undefined, password:undefined, newpassword:undefined, confirmenewpw:undefined};
        } else{
          this.toastr.errorToastr(data['message'], 'Oops!');
         }
      });
    }

   
  updateUser(port) {
    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
    this.http.post(`http://localhost:${port}/users/updateUser/`,
    JSON.stringify(this.usr), {
    headers: headers
    })
    .subscribe(data => {
       if(data['success'] === false){ 
        this.toastr.errorToastr(data['message'], 'Oops!');
      }else{
        localStorage.setItem('usr', JSON.stringify(this.usr));
        this.toastr.successToastr(data['message'], 'Success!');
      }
      if(data['success'] === true){
      setTimeout(
        function(){ 
        window.location.reload();
        }, 500);
      }
    });
  }
}