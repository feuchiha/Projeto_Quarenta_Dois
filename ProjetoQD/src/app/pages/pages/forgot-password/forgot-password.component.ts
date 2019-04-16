import { Component, HostBinding, NgModule } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { BlankLayoutCardComponent } from 'app/components/blank-layout-card';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  styleUrls: ['../../../components/blank-layout-card/blank-layout-card.component.scss'],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent extends BlankLayoutCardComponent {
 email = {email:""}

constructor(private http: HttpClient, public toastr: ToastrManager) {
  super();
}

        forgot(port) {
          const headers = new HttpHeaders()
                .set('Authorization', 'my-auth-token')
                .set('Content-Type', 'application/json');
          // ports:
          // :3000 - to call nodejs server
          // :3001 - to call aspnet core server
          this.http.post(`http://localhost:${port}/forgot/forgot`,
          JSON.stringify(this.email), {
          headers: headers
          })
          .subscribe(data => {
            if(data['success'] === true){ 
              this.toastr.successToastr(data['message'], 'Success!');
            }
          })
      };
}