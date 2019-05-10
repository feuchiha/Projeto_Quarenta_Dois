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
      this.user = JSON.parse(localStorage.getItem('usr'));
      this.user.confirmenewpw = null;
      this.user.newpassword = null;
      this.user.password = null;
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
            if(this.usr.username == "" || this.usr.username == undefined ){
              this.toastr.errorToastr("Informe seu nome para efetuar a alteração do cadastro", 'Oops!');
            }else if (this.usr.email.indexOf("@") == -1 ||
              this.user.email.indexOf(".") == -1 ||
              this.user.email.indexOf("@") == 0 ||
              this.user.email.lastIndexOf(".") + 1 == this.user.email.length ||
              (this.user.email.indexOf("@") + 1 == this.user.email.indexOf("."))) { 
              this.toastr.errorToastr('Informe um e-mail válido', 'Oops!');
            }else{
              this.updateUser(port); 
            }          
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
        this.toastr.successToastr(data['message'], 'Success!');
        this.user = null;
        this.attLocal(port);
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

      