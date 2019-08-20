import { Component, OnInit, ViewChild } from '@angular/core';
import {BlankLayoutCardComponent} from 'app/components/blank-layout-card';
import { QdSelectComponent } from 'app/components/qd-select/qd-select.component';

@Component({
  selector: 'app-importacao',
  templateUrl: './importacao.component.html',
  styleUrls: ['/importacao.component.css']
})
export class ImportacaoComponent extends SidebarComponent implements OnInit{

  ngOnInit(){
    if(this.loadSession()){
      this.display();
    }
  }

  selected: string;

  arrSelect: string[];
  display() {
    this.arrSelect=['7 dias','15 dias','30 dias', '90 dias'];
    document.getElementById('ButtonImportURL')['addEventListener']("click", function() {
      document.querySelector('.bg-modal')['style']['display'] = "flex";
    });

    document.querySelector('.close').addEventListener("click", function() {
      document.querySelector('.bg-modal')['style']['display'] = "none";
    });
  }

  onSelect(val: string){
    this.selected = val;
  }
}