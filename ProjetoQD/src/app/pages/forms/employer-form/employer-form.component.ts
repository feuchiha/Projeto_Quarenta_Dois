import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { SidebarComponent} from '../../../components/sidebar/sidebar.component';


@Component({
  selector: 'app-employer-form',
  styleUrls: ['./employer-form.component.css'],
  templateUrl: 'employer-form.component.html',
})
  
export class EmployerFormComponent extends SidebarComponent implements OnInit {

    ngOnInit(){
      if(this.loadSession()){
        this.user = JSON.parse(localStorage.getItem('usr'));
        this.token = JSON.parse(localStorage.getItem('usr'));
        this.user.confirmenewpw = null;
        this.user.newpassword = null;
        this.user.password = null;
      }
    }
   
    findUser(port) {
      const headers = new HttpHeaders()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');
      this.http.post(`http://localhost:${port}/users/findEmail`,
      JSON.stringify(this.token), {
      headers: headers
      })
      .subscribe(data => {
         if(data['success'] === true){
          this.user = {
            id: data['id'],
            username: this.user.username,
            email: data['email'],
            password: this.user.password,
            newpassword: this.user.newpassword,
            confirmenewpw: this.user.confirmenewpw,
            token: this.token.token,
            emailnew : this.user.email
          }
            if(this.user.username == "" || this.user.username == undefined ){
              this.toastr.errorToastr("Informe seu nome para efetuar a alteração do cadastro", 'Oops!');
            }else if (this.user.email.indexOf("@") == -1 ||
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
    for(let name in this.user){
      if (this.user[name] == null || this.user[name] == "" || 
          this.user[name] == " "  || this.user[name] == undefined){
            this.user[name] = undefined;
          }
    }
    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
    this.http.post(`http://localhost:${port}/users/updateUser/`,
    JSON.stringify(this.user), {
    headers: headers
    })
    .subscribe(data => {
       if(data['success'] === false){ 
        this.toastr.errorToastr(data['message'], 'Oops!');
        this.user.password = null;
        this.user.confirmenewpw = null;
        this.user.newpassword = null
      }else{
        this.toastr.successToastr(data['message'], 'Success!');
        this.attLocal(port);
      }
      
    });
  }

  attLocal(port){
    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
    this.http.post(`http://localhost:${port}/users/findEmail`,
    JSON.stringify(this.token), {
    headers: headers
    })
    .subscribe(data => {
       if(data['success'] === false){
       }else{
        this.user = {
          id: this.user.id,
          username: data['name'],
          email: data['email'],
          password: "",
          newpassword: "",
          confirmenewpw: "",
          token: this.token.token,
          emailnew: this.user.email
        }
       
        localStorage.setItem('usr', JSON.stringify(this.user));
        console.log(this.user);
        setTimeout(function(){ 
          window.location.reload();
          }, 500);
       }
      });
  }
  


}

      