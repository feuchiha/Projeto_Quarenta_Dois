import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UpgradableComponent } from 'theme/components/upgradable';
import { BlankLayoutCardComponent } from 'app/components/blank-layout-card';
import { QdSelectComponent } from 'app/components/qd-select/qd-select.component';


@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit {

  constructor(private http: HttpClient, public toastr: ToastrManager) {
  }

  ngOnInit() {
    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');
    this.http.post(`http://localhost:3002/iateste/iaback`, 
     {
    headers: headers
    })
    .subscribe(data => {
      //if(data['success'] === true){
        //this.toastr.errorToastr(data['message'], 'Oops!');
      //}
      console.log(data);
    });
    
 
  
  }

}
