import { Component } from '@angular/core';
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
      console.log(localStorage.getItem('usr'));
      this.user = JSON.parse(localStorage.getItem('usr'));
    }

    findUser(port) {
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
          this.updateUser(port);
        } else{
          this.toastr.errorToastr(data['message'], 'Oops!');
         }
      });
    }

   
  updateUser(port) {
    for(let name in this.usr){
      if (this.usr[name] == null || this.usr[name] == "" || 
          this.usr[name] == " "  || this.usr[name] == undefined){
            this.usr[name] = undefined;
          }
    }
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
        this.user.password = null;
        this.user.confirmenewpw = null;
        this.user.newpassword = null;
      }else{
        this.attLocal(port);
        this.toastr.successToastr(data['message'], 'Success!');
        this.user.password = null;
        this.user.confirmenewpw = null;
        this.user.newpassword = null;
      }
      
    });
  }

  attLocal(port){
    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
    this.http.post(`http://localhost:${port}/users/findEmail`,
    JSON.stringify(this.local), {
    headers: headers
    })
    .subscribe(data => {
       if(data['success'] === true){
         console.log(data);
        this.user = {
          username: data['name'],
          email: data['email'],
          password: "",
          newpassword: "",
          confirmenewpw: "",
        }
        localStorage.setItem('usr', JSON.stringify(this.user));
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

      