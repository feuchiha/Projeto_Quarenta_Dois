import { Component, HostBinding, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UpgradableComponent } from 'theme/components/upgradable';
import { BlankLayoutCardComponent } from 'app/components/blank-layout-card';
import { QdSelectComponent } from 'app/components/qd-select/qd-select.component';





@Component({
  selector: 'app-dashboard',
  styleUrls: ['dashboard.component.css'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent extends BlankLayoutCardComponent implements OnInit{

  constructor(private http: HttpClient, public toastr: ToastrManager) {
    super();
  }

  selected: string;

arrSelect: string[];

ngOnInit() {
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
  @HostBinding('class.mdl-grid') private readonly mdlGrid = true;
  @HostBinding('class.mdl-grid--no-spacing') private readonly mdlGridNoSpacing = true;
  
  onSelect(val: string){
    this.selected = val;
  }
}

